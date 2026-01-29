"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RustEngine = exports.SYNC_LOCK_NAME = void 0;
const matrix_sdk_crypto_nodejs_1 = require("@matrix-org/matrix-sdk-crypto-nodejs");
const AsyncLock = require("async-lock");
const LogService_1 = require("../logging/LogService");
const Crypto_1 = require("../models/Crypto");
const EncryptionEvent_1 = require("../models/events/EncryptionEvent");
const KeyBackup_1 = require("../models/KeyBackup");
/**
 * @internal
 */
exports.SYNC_LOCK_NAME = "sync";
/**
 * @internal
 */
class RustEngine {
    machine;
    client;
    lock = new AsyncLock();
    trackedUsersToAdd = new Set();
    addTrackedUsersPromise;
    keyBackupVersion;
    keyBackupWaiter = Promise.resolve();
    backupEnabled = false;
    isBackupEnabled() {
        return this.backupEnabled;
    }
    constructor(machine, client) {
        this.machine = machine;
        this.client = client;
    }
    async run() {
        await this.runOnly(); // run everything, but with syntactic sugar
    }
    async runOnly(...types) {
        // Note: we should not be running this until it runs out, so cache the value into a variable
        const requests = await this.machine.outgoingRequests();
        for (const request of requests) {
            if (types.length && !types.includes(request.type))
                continue;
            switch (request.type) {
                case 0 /* RequestType.KeysUpload */:
                    await this.processKeysUploadRequest(request);
                    break;
                case 1 /* RequestType.KeysQuery */:
                    await this.processKeysQueryRequest(request);
                    break;
                case 2 /* RequestType.KeysClaim */:
                    await this.processKeysClaimRequest(request);
                    break;
                case 3 /* RequestType.ToDevice */:
                    await this.processToDeviceRequest(request);
                    break;
                case 5 /* RequestType.RoomMessage */:
                    throw new Error("Bindings error: Sending room messages is not supported");
                case 4 /* RequestType.SignatureUpload */:
                    throw new Error("Bindings error: Backup feature not possible");
                case 6 /* RequestType.KeysBackup */:
                    await this.processKeysBackupRequest(request);
                    break;
                default:
                    throw new Error("Bindings error: Unrecognized request type: " + request.type);
            }
        }
    }
    async addTrackedUsers(userIds) {
        // Add the new set of users to the pool
        userIds.forEach(uId => this.trackedUsersToAdd.add(uId));
        if (this.addTrackedUsersPromise) {
            // If we have a pending promise, don't create another lock requirement.
            return;
        }
        return this.addTrackedUsersPromise = this.lock.acquire(exports.SYNC_LOCK_NAME, async () => {
            // Immediately clear this promise so that a new promise is queued up.
            this.addTrackedUsersPromise = undefined;
            const uids = new Array(this.trackedUsersToAdd.size);
            let idx = 0;
            for (const u of this.trackedUsersToAdd.values()) {
                uids[idx++] = new matrix_sdk_crypto_nodejs_1.UserId(u);
            }
            // Clear the existing pool
            this.trackedUsersToAdd.clear();
            await this.machine.updateTrackedUsers(uids);
            const keysClaim = await this.machine.getMissingSessions(uids);
            if (keysClaim) {
                await this.processKeysClaimRequest(keysClaim);
            }
        });
    }
    async prepareEncrypt(roomId, roomInfo) {
        let memberships = ["join", "invite"];
        let historyVis = 1 /* HistoryVisibility.Joined */;
        switch (roomInfo.historyVisibility) {
            case "world_readable":
                historyVis = 3 /* HistoryVisibility.WorldReadable */;
                break;
            case "invited":
                historyVis = 0 /* HistoryVisibility.Invited */;
                break;
            case "shared":
                historyVis = 2 /* HistoryVisibility.Shared */;
                break;
            case "joined":
            default:
                memberships = ["join"];
        }
        const members = new Set();
        for (const membership of memberships) {
            try {
                (await this.client.getRoomMembersByMembership(roomId, membership))
                    .map(u => new matrix_sdk_crypto_nodejs_1.UserId(u.membershipFor))
                    .forEach(u => void members.add(u));
            }
            catch (err) {
                LogService_1.LogService.warn("RustEngine", `Failed to get room members for membership type "${membership}" in ${roomId}`, (0, LogService_1.extractRequestError)(err));
            }
        }
        if (members.size === 0) {
            return;
        }
        const membersArray = Array.from(members);
        const encEv = new EncryptionEvent_1.EncryptionEvent({
            type: "m.room.encryption",
            content: roomInfo,
        });
        const settings = new matrix_sdk_crypto_nodejs_1.EncryptionSettings();
        settings.algorithm = roomInfo.algorithm === Crypto_1.EncryptionAlgorithm.MegolmV1AesSha2
            ? 1 /* RustEncryptionAlgorithm.MegolmV1AesSha2 */
            : undefined;
        settings.historyVisibility = historyVis;
        settings.rotationPeriod = BigInt(encEv.rotationPeriodMs);
        settings.rotationPeriodMessages = BigInt(encEv.rotationPeriodMessages);
        await this.lock.acquire(exports.SYNC_LOCK_NAME, async () => {
            await this.machine.updateTrackedUsers(membersArray); // just in case we missed some
            await this.runOnly(1 /* RequestType.KeysQuery */);
            const keysClaim = await this.machine.getMissingSessions(membersArray);
            if (keysClaim) {
                await this.processKeysClaimRequest(keysClaim);
            }
        });
        await this.lock.acquire(roomId, async () => {
            const requests = await this.machine.shareRoomKey(new matrix_sdk_crypto_nodejs_1.RoomId(roomId), membersArray, settings);
            for (const req of requests) {
                await this.processToDeviceRequest(req);
            }
            // Back up keys asynchronously
            void this.backupRoomKeysIfEnabled();
        });
    }
    enableKeyBackup(info) {
        this.keyBackupWaiter = this.keyBackupWaiter.then(async () => {
            if (this.backupEnabled) {
                // Finish any pending backups before changing the backup version/pubkey
                await this.actuallyDisableKeyBackup();
            }
            let publicKey;
            switch (info.algorithm) {
                case KeyBackup_1.KeyBackupEncryptionAlgorithm.MegolmBackupV1Curve25519AesSha2:
                    publicKey = info.auth_data.public_key;
                    break;
                default:
                    throw new Error("Key backup error: cannot enable backups with unsupported backup algorithm " + info.algorithm);
            }
            await this.machine.enableBackupV1(publicKey, info.version);
            this.keyBackupVersion = info.version;
            this.backupEnabled = true;
        });
        return this.keyBackupWaiter;
    }
    disableKeyBackup() {
        this.keyBackupWaiter = this.keyBackupWaiter.then(async () => {
            await this.actuallyDisableKeyBackup();
        });
        return this.keyBackupWaiter;
    }
    async actuallyDisableKeyBackup() {
        await this.machine.disableBackup();
        this.keyBackupVersion = undefined;
        this.backupEnabled = false;
    }
    backupRoomKeys() {
        this.keyBackupWaiter = this.keyBackupWaiter.then(async () => {
            if (!this.backupEnabled) {
                throw new Error("Key backup error: attempted to create a backup before having enabled backups");
            }
            await this.actuallyBackupRoomKeys();
        });
        return this.keyBackupWaiter;
    }
    async exportRoomKeysForSession(roomId, sessionId) {
        return JSON.parse(await this.machine.exportRoomKeysForSession(roomId, sessionId));
    }
    backupRoomKeysIfEnabled() {
        this.keyBackupWaiter = this.keyBackupWaiter.then(async () => {
            if (this.backupEnabled) {
                await this.actuallyBackupRoomKeys();
            }
        });
        return this.keyBackupWaiter;
    }
    async actuallyBackupRoomKeys() {
        const request = await this.machine.backupRoomKeys();
        if (request) {
            await this.processKeysBackupRequest(request);
        }
    }
    async processKeysClaimRequest(request) {
        const resp = await this.client.doRequest("POST", "/_matrix/client/v3/keys/claim", null, JSON.parse(request.body));
        await this.machine.markRequestAsSent(request.id, request.type, JSON.stringify(resp));
    }
    async processKeysUploadRequest(request) {
        const body = JSON.parse(request.body);
        // delete body["one_time_keys"]; // use this to test MSC3983
        const resp = await this.client.doRequest("POST", "/_matrix/client/v3/keys/upload", null, body);
        await this.machine.markRequestAsSent(request.id, request.type, JSON.stringify(resp));
    }
    async processKeysQueryRequest(request) {
        const resp = await this.client.doRequest("POST", "/_matrix/client/v3/keys/query", null, JSON.parse(request.body));
        await this.machine.markRequestAsSent(request.id, request.type, JSON.stringify(resp));
    }
    async processToDeviceRequest(request) {
        const resp = await this.client.sendToDevices(request.eventType, JSON.parse(request.body).messages);
        await this.machine.markRequestAsSent(request.txnId, 3 /* RequestType.ToDevice */, JSON.stringify(resp));
    }
    async processKeysBackupRequest(request) {
        let resp;
        try {
            if (!this.keyBackupVersion) {
                throw new Error("Key backup version missing");
            }
            resp = await this.client.doRequest("PUT", "/_matrix/client/v3/room_keys/keys", { version: this.keyBackupVersion }, JSON.parse(request.body));
        }
        catch (e) {
            this.client.emit("crypto.failed_backup", e);
            return;
        }
        await this.machine.markRequestAsSent(request.id, request.type, JSON.stringify(resp));
    }
}
exports.RustEngine = RustEngine;
//# sourceMappingURL=RustEngine.js.map