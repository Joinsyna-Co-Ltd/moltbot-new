import { MatrixClient } from "./MatrixClient";
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
export declare class DMs {
    private client;
    private cached;
    private ready;
    /**
     * Creates a new DM map.
     * @param {MatrixClient} client The client the DM map is for.
     */
    constructor(client: MatrixClient);
    private updateFromAccountData;
    private handleInvite;
    private persistCache;
    private fixDms;
    /**
     * Forces an update of the DM cache.
     * @returns {Promise<void>} Resolves when complete.
     */
    update(): Promise<void>;
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
    getOrCreateDm(userId: string, createFn?: (targetUserId: string) => Promise<string>): Promise<string>;
    /**
     * Determines if a given room is a DM according to the cache.
     * @param {string} roomId The room ID.
     * @returns {boolean} True if the room ID is a cached DM room ID.
     */
    isDm(roomId: string): boolean;
}
