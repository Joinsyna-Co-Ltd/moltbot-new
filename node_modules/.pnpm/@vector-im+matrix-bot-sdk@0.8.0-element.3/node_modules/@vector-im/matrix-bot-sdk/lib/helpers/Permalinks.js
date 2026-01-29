"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permalinks = void 0;
/**
 * Functions for handling permalinks
 * @category Utilities
 */
class Permalinks {
    constructor() {
    }
    // TODO: Encode permalinks
    static encodeViaArgs(servers) {
        if (!servers || !servers.length)
            return "";
        return `?via=${servers.join("&via=")}`;
    }
    /**
     * Creates a room permalink.
     * @param {string} roomIdOrAlias The room ID or alias to create a permalink for.
     * @param {string[]} viaServers The servers to route the permalink through.
     * @returns {string} A room permalink.
     */
    static forRoom(roomIdOrAlias, viaServers = []) {
        return `https://matrix.to/#/${roomIdOrAlias}${Permalinks.encodeViaArgs(viaServers)}`;
    }
    /**
     * Creates a user permalink.
     * @param {string} userId The user ID to create a permalink for.
     * @returns {string} A user permalink.
     */
    static forUser(userId) {
        return `https://matrix.to/#/${userId}`;
    }
    /**
     * Creates an event permalink.
     * @param {string} roomIdOrAlias The room ID or alias to create a permalink in.
     * @param {string} eventId The event ID to reference in the permalink.
     * @param {string[]} viaServers The servers to route the permalink through.
     * @returns {string} An event permalink.
     */
    static forEvent(roomIdOrAlias, eventId, viaServers = []) {
        return `https://matrix.to/#/${roomIdOrAlias}/${eventId}${Permalinks.encodeViaArgs(viaServers)}`;
    }
    /**
     * Parses a permalink URL into usable parts.
     * @param {string} matrixTo The matrix.to URL to parse.
     * @returns {PermalinkParts} The parts of the permalink.
     */
    static parseUrl(matrixTo) {
        const matrixToRegexp = /^https:\/\/matrix\.to\/#\/(?<entity>[^/?]+)\/?(?<eventId>[^?]+)?(?<query>\?[^]*)?$/;
        const url = matrixToRegexp.exec(matrixTo)?.groups;
        if (!url) {
            throw new Error("Not a valid matrix.to URL");
        }
        const entity = decodeURIComponent(url.entity);
        if (entity[0] === '@') {
            return { userId: entity, roomIdOrAlias: undefined, eventId: undefined, viaServers: undefined };
        }
        else if (entity[0] === '#' || entity[0] === '!') {
            return {
                userId: undefined,
                roomIdOrAlias: entity,
                eventId: url.eventId && decodeURIComponent(url.eventId),
                viaServers: new URLSearchParams(url.query).getAll('via'),
            };
        }
        else {
            throw new Error("Unexpected entity");
        }
    }
}
exports.Permalinks = Permalinks;
//# sourceMappingURL=Permalinks.js.map