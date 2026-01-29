import { MatrixClient } from "../MatrixClient";
import { ICryptoRoomInformation } from "./ICryptoRoomInformation";
/**
 * Tracks room encryption status for a MatrixClient.
 * @category Encryption
 */
export declare class RoomTracker {
    private client;
    constructor(client: MatrixClient);
    /**
     * Handles a room join
     * @internal
     * @param roomId The room ID.
     */
    onRoomJoin(roomId: string): Promise<void>;
    /**
     * Handles a room event.
     * @internal
     * @param roomId The room ID.
     * @param event The event.
     */
    onRoomEvent(roomId: string, event: any): Promise<void>;
    /**
     * Queues a room check for the tracker. If the room needs an update to the store, an
     * update will be made.
     * @param {string} roomId The room ID to check.
     */
    queueRoomCheck(roomId: string): Promise<void>;
    /**
     * Gets the room's crypto configuration, as known by the underlying store. If the room is
     * not encrypted then this will return an empty object.
     * @param {string} roomId The room ID to get the config for.
     * @returns {Promise<ICryptoRoomInformation>} Resolves to the encryption config.
     */
    getRoomCryptoConfig(roomId: string): Promise<ICryptoRoomInformation>;
}
