import { Appservice } from "./Appservice";
import { Intent } from "./Intent";
export declare const REMOTE_USER_INFO_ACCOUNT_DATA_EVENT_TYPE = "io.t2bot.sdk.bot.remote_user_info";
export declare const REMOTE_ROOM_INFO_ACCOUNT_DATA_EVENT_TYPE = "io.t2bot.sdk.bot.remote_room_info";
export declare const REMOTE_USER_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = "io.t2bot.sdk.bot.remote_user_map";
export declare const REMOTE_ROOM_MAP_ACCOUNT_DATA_EVENT_TYPE_PREFIX = "io.t2bot.sdk.bot.remote_room_map";
/**
 * @see MatrixBridge
 * @category Application services
 */
export interface IRemoteRoomInfo {
    /**
     * A unique identifier for the remote user.
     */
    id: string;
}
/**
 * @see MatrixBridge
 * @category Application services
 */
export interface IRemoteUserInfo {
    /**
     * A unique identifier for the remote room (or room equivalent).
     */
    id: string;
}
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
export declare class MatrixBridge {
    private appservice;
    constructor(appservice: Appservice);
    /**
     * Gets information about a remote user.
     * @param {Intent} userIntent The Matrix user intent to get information on.
     * @returns {Promise<IRemoteUserInfo>} Resolves to the remote user information.
     */
    getRemoteUserInfo<T extends IRemoteUserInfo>(userIntent: Intent): Promise<T>;
    /**
     * Sets information about a remote user. Calling this function will map the
     * provided remote user ID to the intent's owner.
     * @param {Intent} userIntent The Matrix user intent to store information on.
     * @param {IRemoteUserInfo} remoteInfo The remote user information to store
     * @returns {Promise<any>} Resolves when the information has been updated.
     */
    setRemoteUserInfo<T extends IRemoteUserInfo>(userIntent: Intent, remoteInfo: T): Promise<any>;
    /**
     * Gets information about a remote room.
     * @param {string} matrixRoomId The Matrix room ID to get information on.
     * @returns {Promise<IRemoteRoomInfo>} Resolves to the remote room information.
     */
    getRemoteRoomInfo<T extends IRemoteRoomInfo>(matrixRoomId: string): Promise<T>;
    /**
     * Sets information about a remote room. Calling this function will map the
     * provided remote room ID to the matrix room ID.
     * @param {string} matrixRoomId The Matrix room ID to store information on.
     * @param {IRemoteRoomInfo} remoteInfo The remote room information to store
     * @returns {Promise<any>} Resolves when the information has been updated.
     */
    setRemoteRoomInfo<T extends IRemoteRoomInfo>(matrixRoomId: string, remoteInfo: T): Promise<any>;
    /**
     * Gets the Matrix room ID for the provided remote room ID.
     * @param {string} remoteRoomId The remote room ID to look up.
     * @returns {Promise<string>} Resolves to the Matrix room ID.
     */
    getMatrixRoomIdForRemote(remoteRoomId: string): Promise<string>;
    /**
     * Gets a Matrix user intent for the provided remote user ID.
     * @param {string} remoteUserId The remote user ID to look up.
     * @returns {Promise<Intent>} Resolves to the Matrix user intent.
     */
    getIntentForRemote(remoteUserId: string): Promise<Intent>;
    private updateRemoteUserMapping;
    private updateRemoteRoomMapping;
}
