import { MatrixClient } from "./MatrixClient";
/**
 * A MatrixClient class that handles events in sync for the /sync loop, instead
 * of trying to push its way through the /sync loop as fast as possible. It is
 * intended that the consumer extend this class and override the onWhatever()
 * functions it needs. All of the onWhatever() functions have a default behaviour
 * of doing nothing.
 */
export declare abstract class SynchronousMatrixClient extends MatrixClient {
    /**
     * Creates a new SynchronousMatrixClient. Note that this accepts a MatrixClient, though
     * much of the class's properties are not brought over. Always convert your MatrixClient
     * instance to a SynchronousMatrixClient as soon as possible to avoid diversion in which
     * properties are proxied over.
     * @param {MatrixClient} baseClient The client to wrap.
     */
    protected constructor(baseClient: MatrixClient);
    private handleEvent;
    protected startSyncInternal(): Promise<any>;
    /**
     * Handles the `account_data` event raised by the client.
     * @param {any} event The account data event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onAccountData(event: any): Promise<any>;
    /**
     * Handles the `room.account_data` event raised by the client.
     * @param {string} roomId The Room ID the account data applies to.
     * @param {any} event The room account data event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomAccountData(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.leave` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomLeave(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.invite` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomInvite(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.join` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomJoin(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.message` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomMessage(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.archived` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomArchived(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.upgraded` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomUpgraded(roomId: string, event: any): Promise<any>;
    /**
     * Handles the `room.event` event raised by the client.
     * @param {string} roomId The Room ID the event happened in.
     * @param {any} event The event.
     * @returns {Promise<any>} Resolves when complete.
     */
    protected onRoomEvent(roomId: string, event: any): Promise<any>;
}
