"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynapseAdminApis = exports.SynapseRoomProperty = void 0;
const MatrixError_1 = require("./models/MatrixError");
/**
 * Available properties on a Synapse room listing to order by.
 * @category Admin APIs
 */
var SynapseRoomProperty;
(function (SynapseRoomProperty) {
    SynapseRoomProperty["Name"] = "name";
    SynapseRoomProperty["CanonicalAlias"] = "canonical_alias";
    SynapseRoomProperty["JoinedMembers"] = "joined_members";
    SynapseRoomProperty["JoinedLocalMembers"] = "joined_local_members";
    SynapseRoomProperty["Version"] = "version";
    SynapseRoomProperty["Creator"] = "creator";
    SynapseRoomProperty["Encryption"] = "encryption";
    SynapseRoomProperty["CanFederate"] = "federatable";
    SynapseRoomProperty["IsPublic"] = "public";
    SynapseRoomProperty["JoinRules"] = "join_rules";
    SynapseRoomProperty["GuestAccess"] = "guest_access";
    SynapseRoomProperty["HistoryVisibility"] = "history_visibility";
    SynapseRoomProperty["NumStateEvents"] = "state_events";
})(SynapseRoomProperty || (exports.SynapseRoomProperty = SynapseRoomProperty = {}));
/**
 * Access to various administrative APIs specifically available in Synapse.
 * @category Admin APIs
 */
class SynapseAdminApis {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Get information about a user. The client making the request must be an admin user.
     * @param {string} userId The user ID to check.
     * @returns {Promise<SynapseUser>} The resulting Synapse user record
     */
    async getUser(userId) {
        return this.client.doRequest("GET", "/_synapse/admin/v2/users/" + encodeURIComponent(userId));
    }
    /**
     * Create or update a given user on a Synapse server. The
     * client making the request must be an admin user.
     * @param {string} userId The user ID to check.
     * @param {SynapseUserProperties} opts Options to set when creating or updating the user.
     * @returns {Promise<SynapseUser>} The resulting Synapse user record
     */
    async upsertUser(userId, opts = {}) {
        return this.client.doRequest("PUT", "/_synapse/admin/v2/users/" + encodeURIComponent(userId), undefined, opts);
    }
    /**
     * Get a list of users registered with Synapse, optionally filtered by some criteria. The
     * client making the request must be an admin user.
     * @param {string} from The token to continue listing users from.
     * @param {number} limit The maximum number of users to request.
     * @param {string} name Optional localpart or display name filter for results.
     * @param {boolean} guests Whether or not to include guest accounts. Default true.
     * @param {boolean} deactivated Whether or not to include deactivated accounts. Default false.
     * @returns {Promise<SynapseUserList>} A batch of user results.
     */
    async listUsers(from, limit, name, guests = true, deactivated = false) {
        const qs = { guests, deactivated };
        if (from)
            qs['from'] = from;
        if (limit)
            qs['limit'] = limit;
        if (name)
            qs['name'] = name;
        return this.client.doRequest("GET", "/_synapse/admin/v2/users", qs);
    }
    /**
     * Get a list of all users registered with Synapse, optionally filtered by some criteria. The
     * client making the request must be an admin user.
     *
     * This method returns an async generator that can be used to filter results.
     * @param options Options to pass to the user listing function
     * @example
     * for await (const user of synapseAdminApis.listAllUsers()) {
     *    if (user.name === '@alice:example.com') {
     *       return user;
     *    }
     * }
     */
    async *listAllUsers(options = {}) {
        let from = undefined;
        let response;
        do {
            const qs = {
                ...options,
                ...(from && { from }),
            };
            response = await this.client.doRequest("GET", "/_synapse/admin/v2/users", qs);
            for (const user of response.users) {
                yield user;
            }
            from = response.next_token;
        } while (from);
    }
    /**
     * Determines if the given user is a Synapse server administrator for this homeserver. The
     * client making the request must be an admin user themselves (check with `isSelfAdmin`)
     * @param {string} userId The user ID to check.
     * @returns {Promise<boolean>} Resolves to true if the user is an admin, false otherwise.
     * Throws if there's an error.
     */
    async isAdmin(userId) {
        const response = await this.client.doRequest("GET", `/_synapse/admin/v1/users/${encodeURIComponent(userId)}/admin`);
        return response['admin'] || false;
    }
    /**
     * Determines if the current user is an admin for the Synapse homeserver.
     * @returns {Promise<boolean>} Resolve to true if the user is an admin, false otherwise.
     * Throws if there's an error.
     */
    async isSelfAdmin() {
        try {
            return await this.isAdmin(await this.client.getUserId());
        }
        catch (err) {
            if (err instanceof MatrixError_1.MatrixError && err.errcode === 'M_FORBIDDEN') {
                return false;
            }
            throw err;
        }
    }
    /**
     * Lists the rooms on the server.
     * @param {string} searchTerm A term to search for in the room names
     * @param {string} from A previous batch token to search from
     * @param {number} limit The maximum number of rooms to return
     * @param {SynapseRoomProperty} orderBy A property of rooms to order by
     * @param {boolean} reverseOrder True to reverse the orderBy direction.
     * @returns {Promise<SynapseRoomList>} Resolves to the server's rooms, ordered and filtered.
     */
    async listRooms(searchTerm, from, limit, orderBy, reverseOrder = false) {
        const params = {};
        if (from)
            params['from'] = from;
        if (limit)
            params['limit'] = limit;
        if (searchTerm)
            params['search_term'] = searchTerm;
        if (orderBy)
            params['order_by'] = orderBy;
        if (reverseOrder) {
            params['dir'] = 'b';
        }
        else {
            params['dir'] = 'f';
        }
        return this.client.doRequest("GET", "/_synapse/admin/v1/rooms", params);
    }
    /**
     * Gets a list of state events in a room.
     * @param {string} roomId The room ID to get state for.
     * @returns {Promise<any[]>} Resolves to the room's state events.
     */
    async getRoomState(roomId) {
        const r = await this.client.doRequest("GET", `/_synapse/admin/v1/rooms/${encodeURIComponent(roomId)}/state`);
        return r?.['state'] || [];
    }
    /**
     * Deletes a room from the server, purging all record of it.
     * @param {string} roomId The room to delete.
     * @returns {Promise} Resolves when complete.
     */
    async deleteRoom(roomId) {
        return this.client.doRequest("DELETE", `/_synapse/admin/v2/rooms/${encodeURIComponent(roomId)}`, {}, { purge: true });
    }
    /**
     * Gets the status of all active deletion tasks, and all those completed in the last 24h, for the given room_id.
     * @param {string} roomId The room ID to get deletion state for.
     * @returns {Promise<any[]>} Resolves to the room's deletion status results.
     */
    async getDeleteRoomState(roomId) {
        const r = await this.client.doRequest("GET", `/_synapse/admin/v2/rooms/${encodeURIComponent(roomId)}/delete_status`);
        return r?.['results'] || [];
    }
    /**
     * List all registration tokens on the homeserver.
     * @param valid If true, only valid tokens are returned.
     * If false, only tokens that have expired or have had all uses exhausted are returned.
     * If omitted, all tokens are returned regardless of validity.

     * @returns An array of registration tokens.
     */
    async listRegistrationTokens(valid) {
        const res = await this.client.doRequest("GET", `/_synapse/admin/v1/registration_tokens`, { valid });
        return res.registration_tokens;
    }
    /**
     * Get details about a single token.
     * @param token The token to fetch.
     * @returns A registration tokens, or null if not found.
     */
    async getRegistrationToken(token) {
        try {
            return await this.client.doRequest("GET", `/_synapse/admin/v1/registration_tokens/${encodeURIComponent(token)}`);
        }
        catch (e) {
            if (e?.statusCode === 404) {
                return null;
            }
            throw e;
        }
    }
    /**
     * Create a new registration token.
     * @param options Options to pass to the request.
     * @returns The newly created token.
     */
    async createRegistrationToken(options = {}) {
        return this.client.doRequest("POST", `/_synapse/admin/v1/registration_tokens/new`, undefined, options);
    }
    /**
     * Update an existing registration token.
     * @param token The token to update.
     * @param options Options to pass to the request.
     * @returns The newly created token.
     */
    async updateRegistrationToken(token, options) {
        return this.client.doRequest("PUT", `/_synapse/admin/v1/registration_tokens/${encodeURIComponent(token)}`, undefined, options);
    }
    /**
     * Delete a registration token
     * @param token The token to update.
     * @returns A promise that resolves upon success.
     */
    async deleteRegistrationToken(token) {
        return this.client.doRequest("DELETE", `/_synapse/admin/v1/registration_tokens/${encodeURIComponent(token)}`, undefined, {});
    }
    /**
     * Grants another user the highest power available to a local user who is in the room.
     * If the user is not in the room, and it is not publicly joinable, then invite the user.
     * @param roomId The room to make the user admin in.
     * @param userId The user to make admin in the room. If undefined, it uses the authenticated user.
     * @returns Resolves when complete.
     */
    async makeRoomAdmin(roomId, userId) {
        return this.client.doRequest("POST", `/_synapse/admin/v1/rooms/${encodeURIComponent(roomId)}/make_room_admin`, {}, { user_id: userId });
    }
    /**
    * Get the nearest event to a given timestamp, either forwards or backwards. You do not
    * need to be joined to the room to retrieve this information.
    * @param roomId The room ID to get the context in.
    * @param ts The event ID to get the context of.
    * @param dir The maximum number of events to return on either side of the event.
    * @returns The ID and origin server timestamp of the event.
    */
    async getEventNearestToTimestamp(roomId, ts, dir) {
        return await this.client.doRequest("GET", "/_synapse/admin/v1/rooms/" + encodeURIComponent(roomId) + "/timestamp_to_event", { ts, dir });
    }
}
exports.SynapseAdminApis = SynapseAdminApis;
//# sourceMappingURL=SynapseAdminApis.js.map