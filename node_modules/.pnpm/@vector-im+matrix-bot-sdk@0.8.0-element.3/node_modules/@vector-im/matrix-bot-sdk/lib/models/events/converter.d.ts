import { RoomEvent } from "./RoomEvent";
/**
 * Wraps a room event into a more suitable container.
 * @param {any} event The event object to wrap.
 * @returns {RoomEvent<any>} An instance of the most suitable container for the event.
 * @category Matrix events
 */
export declare function wrapRoomEvent(event: any): RoomEvent<any>;
