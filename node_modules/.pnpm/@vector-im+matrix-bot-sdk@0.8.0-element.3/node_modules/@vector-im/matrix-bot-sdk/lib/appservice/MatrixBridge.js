"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixBridge = exports.REMOTE_ROOM_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = exports.REMOTE_USER_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = exports.REMOTE_ROOM_INFO_ACCOUNT_DATA_EVENT_TYPE = exports.REMOTE_USER_INFO_ACCOUNT_DATA_EVENT_TYPE = void 0;
exports.REMOTE_USER_INFO_ACCOUNT_DATA_EVENT_TYPE = "io.t2bot.sdk.bot.remote_user_info";
exports.REMOTE_ROOM_INFO_ACCOUNT_DATA_EVENT_TYPE = "io.t2bot.sdk.bot.remote_room_info";
exports.REMOTE_USER_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = "io.t2bot.sdk.bot.remote_user_map";
exports.REMOTE_ROOM_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = "io.t2bot.sdk.bot.remote_room_map";
/**
 * Utility class for common operations performed by bridges (represented
 * as appservices).
 *
 * The storage utilities are not intended for bridges which allow 1:many
 * relationships with the remote network.
 *
 * Bridges are generally expected to create their own classes which extend
 * the IRemoteRoomInfo and IRemoteUserInfo interfaces and serialize to JSON
 * cleanly. The serialized version of these classes is persisted in various
 * account data locations for future lookups.
 * @category Application services
 */
class MatrixBridge {
    appservice;
    constructor(appservice) {
        this.appservice = appservice;
    }
    /**
     * Gets information about a remote user.
     * @param {Intent} userIntent The Matrix user intent to get information on.
     * @returns {Promise<IRemoteUserInfo>} Resolves to the remote user information.
     */
    async getRemoteUserInfo(userIntent) {
        await userIntent.ensureRegistered();
        return userIntent.underlyingClient.getAccountData(exports.REMOTE_USER_INFO_ACCOUNT_DATA_EVENT_TYPE);
    }
    /**
     * Sets information about a remote user. Calling this function will map the
     * provided remote user ID to the intent's owner.
     * @param {Intent} userIntent The Matrix user intent to store information on.
     * @param {IRemoteUserInfo} remoteInfo The remote user information to store
     * @returns {Promise<any>} Resolves when the information has been updated.
     */
    async setRemoteUserInfo(userIntent, remoteInfo) {
        await userIntent.ensureRegistered();
        await userIntent.underlyingClient.setAccountData(exports.REMOTE_USER_INFO_ACCOUNT_DATA_EVENT_TYPE, remoteInfo);
        await this.updateRemoteUserMapping(userIntent.userId, remoteInfo.id);
    }
    /**
     * Gets information about a remote room.
     * @param {string} matrixRoomId The Matrix room ID to get information on.
     * @returns {Promise<IRemoteRoomInfo>} Resolves to the remote room information.
     */
    async getRemoteRoomInfo(matrixRoomId) {
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        // We do not need to ensure the user is joined to the room because we can associate
        // room account data with any arbitrary room.
        return bridgeBot.underlyingClient.getRoomAccountData(exports.REMOTE_ROOM_INFO_ACCOUNT_DATA_EVENT_TYPE, matrixRoomId);
    }
    /**
     * Sets information about a remote room. Calling this function will map the
     * provided remote room ID to the matrix room ID.
     * @param {string} matrixRoomId The Matrix room ID to store information on.
     * @param {IRemoteRoomInfo} remoteInfo The remote room information to store
     * @returns {Promise<any>} Resolves when the information has been updated.
     */
    async setRemoteRoomInfo(matrixRoomId, remoteInfo) {
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        // We do not need to ensure the user is joined to the room because we can associate
        // room account data with any arbitrary room.
        await bridgeBot.underlyingClient.setRoomAccountData(exports.REMOTE_ROOM_INFO_ACCOUNT_DATA_EVENT_TYPE, matrixRoomId, remoteInfo);
        await this.updateRemoteRoomMapping(matrixRoomId, remoteInfo.id);
    }
    /**
     * Gets the Matrix room ID for the provided remote room ID.
     * @param {string} remoteRoomId The remote room ID to look up.
     * @returns {Promise<string>} Resolves to the Matrix room ID.
     */
    async getMatrixRoomIdForRemote(remoteRoomId) {
        const eventType = `${exports.REMOTE_ROOM_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX}.${remoteRoomId}`;
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        const result = await bridgeBot.underlyingClient.getAccountData(eventType);
        return result['id'];
    }
    /**
     * Gets a Matrix user intent for the provided remote user ID.
     * @param {string} remoteUserId The remote user ID to look up.
     * @returns {Promise<Intent>} Resolves to the Matrix user intent.
     */
    async getIntentForRemote(remoteUserId) {
        const eventType = `${exports.REMOTE_USER_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX}.${remoteUserId}`;
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        const result = await bridgeBot.underlyingClient.getAccountData(eventType);
        return this.appservice.getIntentForUserId(result['id']);
    }
    async updateRemoteUserMapping(matrixUserId, remoteUserId) {
        const eventType = `${exports.REMOTE_USER_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX}.${remoteUserId}`;
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        await bridgeBot.underlyingClient.setAccountData(eventType, { id: matrixUserId });
    }
    async updateRemoteRoomMapping(matrixRoomId, remoteRoomId) {
        const eventType = `${exports.REMOTE_ROOM_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX}.${remoteRoomId}`;
        const bridgeBot = this.appservice.botIntent;
        await bridgeBot.ensureRegistered();
        await bridgeBot.underlyingClient.setAccountData(eventType, { id: matrixRoomId });
    }
}
exports.MatrixBridge = MatrixBridge;
//# sourceMappingURL=MatrixBridge.js.map