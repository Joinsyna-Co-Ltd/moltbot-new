"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCache = void 0;
const LRU = require("lru-cache");
const __1 = require("..");
const MembershipEvent_1 = require("../models/events/MembershipEvent");
/**
 * Functions for avoiding calls to profile endpoints. Useful for bots when
 * people are mentioned often or bridges which need profile information
 * often.
 * @category Utilities
 */
class ProfileCache {
    client;
    cache;
    /**
     * Creates a new profile cache.
     * @param {number} maxEntries The maximum number of entries to cache.
     * @param {number} maxAgeMs The maximum age of an entry in milliseconds.
     * @param {MatrixClient} client The client to use to get profile updates.
     */
    constructor(maxEntries, maxAgeMs, client) {
        this.client = client;
        this.cache = new LRU.LRUCache({
            max: maxEntries,
            ttl: maxAgeMs,
        });
    }
    getCacheKey(userId, roomId) {
        return `${userId}@${roomId || '<none>'}`;
    }
    /**
     * Watch for profile changes to cached entries with the provided client. The
     * same client will also be used to update the user's profile in the cache.
     * @param {MatrixClient} client The client to watch for profile changes with.
     */
    watchWithClient(client) {
        client.on("room.event", async (roomId, event) => {
            if (!event['state_key'] || !event['content'] || event['type'] !== 'm.room.member')
                return;
            await this.tryUpdateProfile(roomId, new MembershipEvent_1.MembershipEvent(event), client);
        });
    }
    /**
     * Watch for profile changes to cached entries with the provided application
     * service. The clientFn will be called to get the relevant client for any
     * updates. If the clientFn is null, the appservice's bot user will be used.
     * The clientFn takes two arguments: the user ID being updated and the room ID
     * they are being updated in (shouldn't be null). The return value should be the
     * MatrixClient to use, or null to use the appservice's bot client. The same
     * client will be used to update the user's general profile, if that profile
     * is cached.
     * @param {Appservice} appservice The application service to watch for profile changes with.
     * @param {Function} clientFn The function to use to acquire profile updates with. If null, the appservice's bot client will be used.
     */
    watchWithAppservice(appservice, clientFn = null) {
        if (!clientFn)
            clientFn = () => appservice.botClient;
        appservice.on("room.event", async (roomId, event) => {
            if (!event['state_key'] || !event['content'] || event['type'] !== 'm.room.member')
                return;
            const memberEvent = new MembershipEvent_1.MembershipEvent(event);
            let client = clientFn(memberEvent.membershipFor, roomId);
            if (!client)
                client = appservice.botClient;
            await this.tryUpdateProfile(roomId, memberEvent, client);
        });
    }
    /**
     * Gets a profile for a user in optional room.
     * @param {string} userId The user ID to get a profile for.
     * @param {string|null} roomId Optional room ID to get a per-room profile for the user.
     * @returns {Promise<MatrixProfile>} Resolves to the user's profile.
     */
    async getUserProfile(userId, roomId = null) {
        const cacheKey = this.getCacheKey(userId, roomId);
        const cached = this.cache.get(cacheKey);
        if (cached)
            return Promise.resolve(cached);
        const profile = await this.getUserProfileWith(userId, roomId, this.client);
        this.cache.set(cacheKey, profile);
        return profile;
    }
    async getUserProfileWith(userId, roomId, client) {
        try {
            if (roomId) {
                const membership = await client.getRoomStateEventContent(roomId, "m.room.member", userId);
                return new __1.MatrixProfile(userId, membership);
            }
            else {
                const profile = await client.getUserProfile(userId);
                return new __1.MatrixProfile(userId, profile);
            }
        }
        catch (e) {
            __1.LogService.warn("ProfileCache", "Non-fatal error getting user profile. They might not exist.");
            __1.LogService.warn("ProfileCache", (0, __1.extractRequestError)(e));
            return new __1.MatrixProfile(userId, {});
        }
    }
    async tryUpdateProfile(roomId, memberEvent, client) {
        const roomCacheKey = this.getCacheKey(memberEvent.membershipFor, roomId);
        const generalCacheKey = this.getCacheKey(memberEvent.membershipFor, null);
        if (this.cache.has(roomCacheKey)) {
            this.cache.set(roomCacheKey, new __1.MatrixProfile(memberEvent.membershipFor, memberEvent.content));
        }
        // TODO: Try and figure out semantics for this updating.
        // Large accounts could cause hammering on the profile endpoint, but hopefully it is cached by the server.
        if (this.cache.has(generalCacheKey)) {
            const profile = await this.getUserProfileWith(memberEvent.membershipFor, null, client);
            this.cache.set(generalCacheKey, profile);
        }
    }
}
exports.ProfileCache = ProfileCache;
//# sourceMappingURL=ProfileCache.js.map