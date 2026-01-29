import { StateEvent } from "./RoomEvent";
/**
 * The content definition for m.room.aliases events
 * @category Matrix event contents
 * @see AliasesEvent
 */
export interface AliasesEventContent {
    /**
     * The aliases this domain has published to the room.
     */
    aliases: string[];
}
/**
 * Represents an m.room.aliases state event
 * @category Matrix events
 */
export declare class AliasesEvent extends StateEvent<AliasesEventContent> {
    constructor(event: any);
    /**
     * The domain the aliases belong to.
     */
    get forDomain(): string;
    /**
     * The aliases the domain has published to the room.
     */
    get aliases(): string[];
}
