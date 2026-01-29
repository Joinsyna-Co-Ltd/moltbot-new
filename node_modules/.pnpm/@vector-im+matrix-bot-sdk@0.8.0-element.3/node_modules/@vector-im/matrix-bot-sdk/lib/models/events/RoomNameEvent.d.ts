import { StateEvent } from "./RoomEvent";
/**
 * The content definition for m.room.name events
 * @category Matrix event contents
 * @see RoomNameEvent
 */
export interface RoomNameEventContent {
    name: string;
}
/**
 * Represents an m.room.name state event
 * @category Matrix events
 */
export declare class RoomNameEvent extends StateEvent<RoomNameEventContent> {
    constructor(event: any);
    /**
     * The name of the room.
     */
    get name(): string;
}
