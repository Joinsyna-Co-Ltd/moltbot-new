/**
 * The parts of a permalink.
 * @see Permalinks
 * @category Utilities
 */
export interface PermalinkParts {
    /**
     * The room ID or alias the permalink references. May be undefined.
     */
    roomIdOrAlias: string;
    /**
     * The user ID the permalink references. May be undefined.
     */
    userId: string;
    /**
     * The event ID the permalink references. May be undefined.
     */
    eventId: string;
    /**
     * The servers the permalink is routed through. May be undefined or empty.
     */
    viaServers: string[];
}
/**
 * Functions for handling permalinks
 * @category Utilities
 */
export declare class Permalinks {
    private constructor();
    private static encodeViaArgs;
    /**
     * Creates a room permalink.
     * @param {string} roomIdOrAlias The room ID or alias to create a permalink for.
     * @param {string[]} viaServers The servers to route the permalink through.
     * @returns {string} A room permalink.
     */
    static forRoom(roomIdOrAlias: string, viaServers?: string[]): string;
    /**
     * Creates a user permalink.
     * @param {string} userId The user ID to create a permalink for.
     * @returns {string} A user permalink.
     */
    static forUser(userId: string): string;
    /**
     * Creates an event permalink.
     * @param {string} roomIdOrAlias The room ID or alias to create a permalink in.
     * @param {string} eventId The event ID to reference in the permalink.
     * @param {string[]} viaServers The servers to route the permalink through.
     * @returns {string} An event permalink.
     */
    static forEvent(roomIdOrAlias: string, eventId: string, viaServers?: string[]): string;
    /**
     * Parses a permalink URL into usable parts.
     * @param {string} matrixTo The matrix.to URL to parse.
     * @returns {PermalinkParts} The parts of the permalink.
     */
    static parseUrl(matrixTo: string): PermalinkParts;
}
