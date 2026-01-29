import { RoomEvent } from "./RoomEvent";
/**
 * The content definition for m.room.redaction events
 * @category Matrix event contents
 * @see RedactionEvent
 */
export interface RedactionEventContent {
    /**
     * The event ID or IDs this event redacts.
     */
    redacts?: string | string[];
}
/**
 * Represents an m.room.redaction room event
 * @category Matrix events
 */
export declare class RedactionEvent extends RoomEvent<RedactionEventContent> {
    constructor(event: any);
    /**
     * The event ID this event redacts.
     * @deprecated It is possible for multiple events to be redacted depending on the room version.
     */
    get redactsEventId(): string;
    /**
     * The event IDs this event redacts.
     */
    get redactsEventIds(): string[];
}
