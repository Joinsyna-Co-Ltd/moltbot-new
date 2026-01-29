"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoClient = void 0;
const matrix_sdk_crypto_nodejs_1 = require("@matrix-org/matrix-sdk-crypto-nodejs");
const LogService_1 = require("../logging/LogService");
const decorators_1 = require("./decorators");
const RoomTracker_1 = require("./RoomTracker");
const EncryptedRoomEvent_1 = require("../models/events/EncryptedRoomEvent");
const RoomEvent_1 = require("../models/events/RoomEvent");
const RustEngine_1 = require("./RustEngine");
const MembershipEvent_1 = require("../models/events/MembershipEvent");
/**
 * Manages encryption for a MatrixClient. Get an instance from a MatrixClient directly
 * rather than creating one manually.
 * @category Encryption
 */
class CryptoClient {
    client;
    ready = false;
    deviceId;
    deviceEd25519;
    deviceCurve25519;
    roomTracker;
    engine;
    constructor(client) {
        this.client = client;
        this.roomTracker = new RoomTracker_1.RoomTracker(this.client);
    }
    get storage() {
        return this.client.cryptoStore;
    }
    /**
     * The device ID for the MatrixClient.
     */
    get clientDeviceId() {
        return this.deviceId;
    }
    /**
     * The device's Ed25519 identity
     */
    get clientDeviceEd25519() {
        return this.deviceEd25519;
    }
    /**
     * Whether or not the crypto client is ready to be used. If not ready, prepare() should be called.
     * @see prepare
     */
    get isReady() {
        return this.ready;
    }
    /**
     * Prepares the crypto client for usage.
     * @param {string[]} roomIds The room IDs the MatrixClient is joined to.
     */
    async prepare() {
        if (this.ready)
            return; // stop re-preparing here
        const storedDeviceId = await this.client.cryptoStore.getDeviceId();
        const { user_id: userId, device_id: deviceId } = (await this.client.getWhoAmI());
        if (!deviceId) {
            throw new Error("Encryption not possible: server not revealing device ID");
        }
        const storagePath = await this.storage.getMachineStoragePath(deviceId);
        if (storedDeviceId !== deviceId) {
            this.client.cryptoStore.setDeviceId(deviceId);
        }
        this.deviceId = deviceId;
        LogService_1.LogService.info("CryptoClient", `Starting ${userId} with device ID:`, this.deviceId); // info so all bots know for debugging
        const machine = await matrix_sdk_crypto_nodejs_1.OlmMachine.initialize(new matrix_sdk_crypto_nodejs_1.UserId(userId), new matrix_sdk_crypto_nodejs_1.DeviceId(this.deviceId), storagePath, "", this.storage.storageType);
        this.engine = new RustEngine_1.RustEngine(machine, this.client);
        await this.engine.run();
        const identity = this.engine.machine.identityKeys;
        this.deviceCurve25519 = identity.curve25519.toBase64();
        this.deviceEd25519 = identity.ed25519.toBase64();
        LogService_1.LogService.info("CryptoClient", `Running ${userId} with device Ed25519 identity:`, this.deviceEd25519); // info so all bots know for debugging
        this.ready = true;
    }
    /**
     * Handles a room event.
     * @internal
     * @param roomId The room ID.
     * @param event The event.
     */
    async onRoomEvent(roomId, event) {
        await this.roomTracker.onRoomEvent(roomId, event);
        if (typeof event['state_key'] !== 'string')
            return;
        if (event['type'] === 'm.room.member') {
            const membership = new MembershipEvent_1.MembershipEvent(event);
            if (membership.effectiveMembership !== 'join' && membership.effectiveMembership !== 'invite')
                return;
            await this.engine.addTrackedUsers([membership.membershipFor]);
        }
        else if (event['type'] === 'm.room.encryption') {
            return this.client.getRoomMembers(roomId, null, ['join', 'invite']).then(members => this.engine.addTrackedUsers(members.map(e => e.membershipFor)), e => void LogService_1.LogService.warn("CryptoClient", `Unable to get members of room ${roomId}`));
        }
    }
    /**
     * Handles a room join.
     * @internal
     * @param roomId The room ID.
     */
    async onRoomJoin(roomId) {
        await this.roomTracker.onRoomJoin(roomId);
        if (await this.isRoomEncrypted(roomId)) {
            const members = await this.client.getRoomMembers(roomId, null, ['join', 'invite']);
            await this.engine.addTrackedUsers(members.map(e => e.membershipFor));
        }
    }
    /**
     * Exports a set of keys for a given session.
     * @param roomId The room ID for the session.
     * @param sessionId The session ID.
     * @returns An array of session keys.
     */
    async exportRoomKeysForSession(roomId, sessionId) {
        return this.engine.exportRoomKeysForSession(roomId, sessionId);
    }
    /**
     * Checks if a room is encrypted.
     * @param {string} roomId The room ID to check.
     * @returns {Promise<boolean>} Resolves to true if encrypted, false otherwise.
     */
    async isRoomEncrypted(roomId) {
        const config = await this.roomTracker.getRoomCryptoConfig(roomId);
        return !!config?.algorithm;
    }
    /**
     * Updates the client's sync-related data.
     * @param {Array.<IToDeviceMessage<IOlmEncrypted>>} toDeviceMessages The to-device messages received.
     * @param {OTKCounts} otkCounts The current OTK counts.
     * @param {OTKAlgorithm[]} unusedFallbackKeyAlgs The unused fallback key algorithms.
     * @param {string[]} changedDeviceLists The user IDs which had device list changes.
     * @param {string[]} leftDeviceLists The user IDs which the server believes we no longer need to track.
     * @returns {Promise<void>} Resolves when complete.
     */
    async updateSyncData(toDeviceMessages, otkCounts, unusedFallbackKeyAlgs, changedDeviceLists, leftDeviceLists) {
        const deviceMessages = JSON.stringify(toDeviceMessages);
        const deviceLists = new matrix_sdk_crypto_nodejs_1.DeviceLists(changedDeviceLists.map(u => new matrix_sdk_crypto_nodejs_1.UserId(u)), leftDeviceLists.map(u => new matrix_sdk_crypto_nodejs_1.UserId(u)));
        await this.engine.lock.acquire(RustEngine_1.SYNC_LOCK_NAME, async () => {
            const syncResp = JSON.parse(await this.engine.machine.receiveSyncChanges(deviceMessages, deviceLists, otkCounts, unusedFallbackKeyAlgs));
            if (Array.isArray(syncResp) && syncResp.length === 2 && Array.isArray(syncResp[0])) {
                for (const msg of syncResp[0]) {
                    this.client.emit("to_device.decrypted", msg);
                }
            }
            else {
                LogService_1.LogService.error("CryptoClient", "OlmMachine.receiveSyncChanges did not return an expected value of [to-device events, room key changes]");
            }
            await this.engine.run();
        });
    }
    /**
     * Signs an object using the device keys.
     * @param {object} obj The object to sign.
     * @returns {Promise<Signatures>} The signatures for the object.
     */
    async sign(obj) {
        obj = JSON.parse(JSON.stringify(obj));
        const existingSignatures = obj['signatures'] || {};
        delete obj['signatures'];
        delete obj['unsigned'];
        const container = await this.engine.machine.sign(JSON.stringify(obj));
        const userSignature = container.get(new matrix_sdk_crypto_nodejs_1.UserId(await this.client.getUserId()));
        const sig = {
            [await this.client.getUserId()]: {},
        };
        for (const [key, maybeSignature] of Object.entries(userSignature)) {
            if (maybeSignature.isValid) {
                sig[await this.client.getUserId()][key] = maybeSignature.signature.toBase64();
            }
        }
        return {
            ...sig,
            ...existingSignatures,
        };
    }
    /**
     * Encrypts the details of a room event, returning an encrypted payload to be sent in an
     * `m.room.encrypted` event to the room. If needed, this function will send decryption keys
     * to the appropriate devices in the room (this happens when the Megolm session rotates or
     * gets created).
     * @param {string} roomId The room ID to encrypt within. If the room is not encrypted, an
     * error is thrown.
     * @param {string} eventType The event type being encrypted.
     * @param {any} content The event content being encrypted.
     * @returns {Promise<IMegolmEncrypted>} Resolves to the encrypted content for an `m.room.encrypted` event.
     */
    async encryptRoomEvent(roomId, eventType, content) {
        if (!(await this.isRoomEncrypted(roomId))) {
            throw new Error("Room is not encrypted");
        }
        await this.engine.prepareEncrypt(roomId, await this.roomTracker.getRoomCryptoConfig(roomId));
        const encrypted = JSON.parse(await this.engine.machine.encryptRoomEvent(new matrix_sdk_crypto_nodejs_1.RoomId(roomId), eventType, JSON.stringify(content)));
        await this.engine.run();
        return encrypted;
    }
    /**
     * Decrypts a room event. Currently only supports Megolm-encrypted events (default for this SDK).
     * @param {EncryptedRoomEvent} event The encrypted event.
     * @param {string} roomId The room ID where the event was sent.
     * @returns {Promise<RoomEvent<unknown>>} Resolves to a decrypted room event, or rejects/throws with
     * an error if the event is undecryptable.
     */
    async decryptRoomEvent(event, roomId) {
        const decrypted = await this.engine.machine.decryptRoomEvent(JSON.stringify(event.raw), new matrix_sdk_crypto_nodejs_1.RoomId(roomId));
        const clearEvent = JSON.parse(decrypted.event);
        return new RoomEvent_1.RoomEvent({
            ...event.raw,
            type: clearEvent.type || "io.t2bot.unknown",
            content: (typeof (clearEvent.content) === 'object') ? clearEvent.content : {},
        });
    }
    /**
     * Encrypts a file for uploading in a room, returning the encrypted data and information
     * to include in a message event (except media URL) for sending.
     * @param {Buffer} file The file to encrypt.
     * @returns {{buffer: Buffer, file: Omit<EncryptedFile, "url">}} Resolves to the encrypted
     * contents and file information.
     */
    async encryptMedia(file) {
        const encrypted = matrix_sdk_crypto_nodejs_1.Attachment.encrypt(file);
        const info = JSON.parse(encrypted.mediaEncryptionInfo);
        return {
            buffer: Buffer.from(encrypted.encryptedData),
            file: info,
        };
    }
    /**
     * Decrypts a previously-uploaded encrypted file, validating the fields along the way.
     * @param {EncryptedFile} file The file to decrypt.
     * @returns {Promise<Buffer>} Resolves to the decrypted file contents.
     */
    async decryptMedia(file) {
        const contents = this.client.contentScannerInstance ?
            await this.client.contentScannerInstance.downloadEncryptedContent(file) :
            (await this.client.downloadContent(file.url)).data;
        const encrypted = new matrix_sdk_crypto_nodejs_1.EncryptedAttachment(contents, JSON.stringify(file));
        const decrypted = matrix_sdk_crypto_nodejs_1.Attachment.decrypt(encrypted);
        return Buffer.from(decrypted);
    }
    /**
     * Enable backing up of room keys.
     * @param {IKeyBackupInfoRetrieved} info The configuration for key backup behaviour,
     * as returned by {@link MatrixClient#getKeyBackupVersion}.
     * @returns {Promise<void>} Resolves once backups have been enabled.
     */
    async enableKeyBackup(info) {
        if (!this.engine.isBackupEnabled()) {
            // Only add the listener if we didn't add it already
            this.client.on("to_device.decrypted", this.onToDeviceMessage);
        }
        await this.engine.enableKeyBackup(info);
        // Back up any pending keys now, but asynchronously
        void this.engine.backupRoomKeys();
    }
    /**
     * Disable backing up of room keys.
     */
    async disableKeyBackup() {
        await this.engine.disableKeyBackup();
        this.client.removeListener("to_device.decrypted", this.onToDeviceMessage);
    }
    onToDeviceMessage = (msg) => {
        if (msg.type === "m.room_key") {
            this.engine.backupRoomKeys();
        }
    };
}
exports.CryptoClient = CryptoClient;
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "isRoomEncrypted", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Array, Array, Array]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "updateSyncData", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "sign", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "encryptRoomEvent", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EncryptedRoomEvent_1.EncryptedRoomEvent, String]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "decryptRoomEvent", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buffer]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "encryptMedia", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "decryptMedia", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "enableKeyBackup", null);
__decorate([
    (0, decorators_1.requiresReady)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CryptoClient.prototype, "disableKeyBackup", null);
//# sourceMappingURL=CryptoClient.js.map