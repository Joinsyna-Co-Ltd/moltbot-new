import { MatrixClient, MatrixProfile } from "..";
import { Appservice } from "../appservice/Appservice";
/**
 * Functions for avoiding calls to profile endpoints. Useful for bots when
 * people are mentioned often or bridges which need profile information
 * often.
 * @category Utilities
 */
export declare class ProfileCache {
    private client;
    private cache;
    /**
     * Creates a new profile cache.
     * @param {number} maxEntries The maximum number of entries to cache.
     * @param {number} maxAgeMs The maximum age of an entry in milliseconds.
     * @param {MatrixClient} client The client to use to get profile updates.
     */
    constructor(maxEntries: number, maxAgeMs: number, client: MatrixClient);
    private getCacheKey;
    /**
     * Watch for profile changes to cached entries with the provided client. The
     * same client will also be used to update the user's profile in the cache.
     * @param {MatrixClient} client The client to watch for profile changes with.
     */
    watchWithClient(client: MatrixClient): void;
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
    watchWithAppservice(appservice: Appservice, clientFn?: (userId: string, roomId: string) => MatrixClient): void;
    /**
     * Gets a profile for a user in optional room.
     * @param {string} userId The user ID to get a profile for.
     * @param {string|null} roomId Optional room ID to get a per-room profile for the user.
     * @returns {Promise<MatrixProfile>} Resolves to the user's profile.
     */
    getUserProfile(userId: string, roomId?: string): Promise<MatrixProfile>;
    private getUserProfileWith;
    private tryUpdateProfile;
}
