"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMs = void 0;
const Crypto_1 = require("./models/Crypto");
const LogService_1 = require("./logging/LogService");
/**
 * Handles DM (direct messages) matching between users. Note that bots which
 * existed prior to this might not have DM rooms populated correctly - the
 * account data can be populated externally and that will be reflected here.
 *
 * Note that DM status is persisted across all access tokens for a user and
 * is not persisted with the regular stores. The DM map is instead tracked
 * on the homeserver as account data and thus survives the bot's own storage
 * being wiped.
 * @category Utilities
 */
class DMs {
    client;
    cached = new Map();
    ready;
    /**
     * Creates a new DM map.
     * @param {MatrixClient} client The client the DM map is for.
     */
    constructor(client) {
        this.client = client;
        this.client.on("account_data", (ev) => {
            if (ev['type'] !== 'm.direct')
                return;
            // noinspection JSIgnoredPromiseFromCall
            this.updateFromAccountData();
        });
        this.client.on("room.invite", (rid, ev) => this.handleInvite(rid, ev));
    }
    async updateFromAccountData() {
        // Don't trust the sync update
        let map = {};
        try {
            map = await this.client.getAccountData("m.direct");
        }
        catch (e) {
            if (e.body?.errcode !== "M_NOT_FOUND" && e.statusCode !== 404) {
                LogService_1.LogService.warn("DMs", "Error getting m.direct account data: ", e);
            }
        }
        this.cached = new Map();
        for (const [userId, roomIds] of Object.entries(map)) {
            this.cached.set(userId, roomIds);
        }
    }
    async handleInvite(roomId, ev) {
        if (ev['content']?.['is_direct'] === true) {
            const userId = ev['sender'];
            if (!this.cached.has(userId))
                this.cached.set(userId, []);
            this.cached.set(userId, [roomId, ...this.cached.get(userId)]);
            await this.persistCache();
        }
    }
    async persistCache() {
        const obj = {};
        for (const [uid, rids] of this.cached.entries()) {
            obj[uid] = rids;
        }
        await this.client.setAccountData("m.direct", obj);
    }
    async fixDms(userId) {
        const currentRooms = this.cached.get(userId);
        if (!currentRooms)
            return;
        const toKeep = [];
        for (const roomId of currentRooms) {
            try {
                const members = await this.client.getAllRoomMembers(roomId);
                const joined = members.filter(m => m.effectiveMembership === "join" || m.effectiveMembership === "invite");
                if (joined.some(m => m.membershipFor === userId)) {
                    toKeep.push(roomId);
                }
            }
            catch (e) {
                LogService_1.LogService.warn("DMs", `Unable to check ${roomId} for room members - assuming invalid DM`);
            }
        }
        if (toKeep.length === currentRooms.length)
            return; // no change
        if (toKeep.length > 0) {
            this.cached.set(userId, toKeep);
        }
        else {
            this.cached.delete(userId);
        }
        await this.persistCache();
    }
    /**
     * Forces an update of the DM cache.
     * @returns {Promise<void>} Resolves when complete.
     */
    async update() {
        await this.ready; // finish the existing call if present
        this.ready = this.updateFromAccountData();
        return this.ready;
    }
    /**
     * Gets or creates a DM with a given user. If a DM needs to be created, it will
     * be created as an encrypted DM (if both the MatrixClient and target user support
     * crypto). Otherwise, the createFn can be used to override the call. Note that
     * when creating a DM room the room should have `is_direct: true` set.
     * @param {string} userId The user ID to get/create a DM for.
     * @param {Function} createFn Optional function to use to create the room. Resolves
     * to the created room ID.
     * @returns {Promise<string>} Resolves to the DM room ID.
     */
    async getOrCreateDm(userId, createFn) {
        await this.ready;
        await this.fixDms(userId);
        const rooms = this.cached.get(userId);
        if (rooms?.length)
            return rooms[0];
        let roomId;
        if (createFn) {
            roomId = await createFn(userId);
        }
        else {
            let hasKeys = false;
            if (!!this.client.crypto) {
                const keys = await this.client.getUserDevices([userId]);
                const userKeys = keys?.device_keys?.[userId] ?? {};
                hasKeys = Object.values(userKeys).filter(device => Object.values(device).length > 0).length > 0;
            }
            roomId = await this.client.createRoom({
                invite: [userId],
                is_direct: true,
                preset: "trusted_private_chat",
                initial_state: hasKeys ? [{
                        type: "m.room.encryption",
                        state_key: "",
                        content: { algorithm: Crypto_1.EncryptionAlgorithm.MegolmV1AesSha2 },
                    }] : [],
            });
        }
        if (!this.cached.has(userId))
            this.cached.set(userId, []);
        this.cached.set(userId, [roomId, ...this.cached.get(userId)]);
        await this.persistCache();
        return roomId;
    }
    /**
     * Determines if a given room is a DM according to the cache.
     * @param {string} roomId The room ID.
     * @returns {boolean} True if the room ID is a cached DM room ID.
     */
    isDm(roomId) {
        for (const val of this.cached.values()) {
            if (val.includes(roomId)) {
                return true;
            }
        }
        return false;
    }
}
exports.DMs = DMs;
//# sourceMappingURL=DMs.js.map