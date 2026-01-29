import { MatrixClient } from "./MatrixClient";
import { MSC2380MediaInfo } from "./models/unstable/MediaInfo";
/**
 * Unstable APIs that shouldn't be used in most circumstances.
 * @category Unstable APIs
 */
export declare class UnstableApis {
    private client;
    constructor(client: MatrixClient);
    /**
     * Gets the local room aliases that are published for a given room.
     * @param {string} roomId The room ID to get local aliases for.
     * @returns {Promise<string[]>} Resolves to the aliases on the room, or an empty array.
     * @deprecated Relies on MSC2432 endpoint.
     */
    getRoomAliases(roomId: string): Promise<string[]>;
    /**
     * Adds a reaction to an event. The contract for this function may change in the future.
     * @param {string} roomId The room ID to react in
     * @param {string} eventId The event ID to react against, in the given room
     * @param {string} emoji The emoji to react with
     * @returns {Promise<string>} Resolves to the event ID of the reaction
     */
    addReactionToEvent(roomId: string, eventId: string, emoji: string): Promise<string>;
    /**
     * Get relations for a given event.
     * @param {string} roomId The room ID to for the given event.
     * @param {string} eventId The event ID to list relations for.
     * @param {string?} relationType The type of relations (e.g. `m.room.member`) to filter for. Optional.
     * @param {string?} eventType The type of event to look for (e.g. `m.room.member`). Optional.
     * @returns {Promise<{chunk: any[]}>} Resolves to an object containing the chunk of relations
     * @deprecated Please use the function of the same name in MatrixClient. This will be removed in a future release.
     */
    getRelationsForEvent(roomId: string, eventId: string, relationType?: string, eventType?: string): Promise<{
        chunk: any[];
    }>;
    /**
     * Get information about a media item. Implements MSC2380
     * @param {string} mxcUrl The MXC to get information about.
     * @returns {Promise<MSC2380MediaInfo>} Resolves to an object containing the media information.
     */
    getMediaInfo(mxcUrl: string): Promise<MSC2380MediaInfo>;
}
