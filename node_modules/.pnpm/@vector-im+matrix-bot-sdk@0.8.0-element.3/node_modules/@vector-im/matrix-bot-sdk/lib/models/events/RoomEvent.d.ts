import { MatrixEvent } from "./Event";
/**
 * The typical unsigned data found on an event.
 * @category Matrix event info
 * @see RoomEvent
 */
export interface TypicalUnsigned {
    /**
     * The age of this event in seconds.
     */
    age?: number;
    /**
     * Other properties which may be included.
     */
    [prop: string]: any;
}
/**
 * Empty room event content.
 * @category Matrix event contents
 */
export interface RoomEventContent {
}
/**
 * A Matrix room event.
 * @category Matrix events
 */
export declare class RoomEvent<T extends (Object | unknown) = unknown> extends MatrixEvent<T> {
    protected event: any;
    constructor(event: any);
    /**
     * The event ID of this event.
     */
    get eventId(): string;
    /**
     * The timestamp in milliseconds this event was sent.
     */
    get timestamp(): number;
    /**
     * The unsigned content for this event. May have no properties.
     */
    get unsigned(): TypicalUnsigned;
}
/**
 * A room state event.
 * @category Matrix events
 */
export declare class StateEvent<T extends (Object | unknown) = unknown> extends RoomEvent<T> {
    constructor(event: any);
    /**
     * The state key for this event. May be an empty string.
     */
    get stateKey(): string;
    /**
     * The previous content for this state event. Will be an empty
     * object if there is no previous content.
     */
    get previousContent(): T;
}
/**
 * Raw event as it appears on the CS API
 */
export interface APIRoomEvent {
    content: Record<string, unknown>;
    event_id: string;
    origin_server_ts: number;
    room_id: string;
    sender: string;
    state_key?: string;
    type: string;
    unsigned: Record<string, unknown>;
}
/**
 * Raw state event as it appears on the CS API
 */
export type APIRoomStateEvent = APIRoomEvent & Required<Pick<APIRoomEvent, "state_key">>;
