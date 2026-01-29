import { StateEvent } from "./RoomEvent";
/**
 * The content definition for m.room.power_levels events
 * @category Matrix event contents
 * @see PowerLevelsEvent
 */
export interface PowerLevelsEventContent {
    /**
     * The power level required to ban. Default 50.
     */
    ban?: number;
    /**
     * A map of event types to the power level required to send them.
     */
    events?: {
        [eventType: string]: number;
    };
    /**
     * The power level required to send events in the room. Default 50.
     */
    events_default?: number;
    /**
     * The power level required to invite users to the room. Default 50.
     */
    invite?: number;
    /**
     * The power level required to kick users from the room. Default 50.
     */
    kick?: number;
    /**
     * The power level required to redact other people's events in the room. Default 50.
     */
    redact?: number;
    /**
     * The power level required to send state events in the room. Default 50.
     */
    state_default?: number;
    /**
     * A map of user IDs to power levels.
     */
    users?: {
        [userId: string]: number;
    };
    /**
     * The power level of users not listed in `users`. Default 0.
     */
    users_default?: number;
    /**
     * Power levels required to send certain kinds of notifications.
     */
    notifications?: {
        /**
         * The power level required to send "@room" notifications. Default 50.
         */
        room?: number;
    };
}
/**
 * Represents an m.room.power_levels state event
 * @category Matrix events
 */
export declare class PowerLevelsEvent extends StateEvent<PowerLevelsEventContent> {
    constructor(event: any);
    /**
     * The power level required to ban users.
     */
    get banLevel(): number;
    /**
     * The power level required to invite users.
     */
    get inviteLevel(): number;
    /**
     * The power level required to kick users.
     */
    get kickLevel(): number;
    /**
     * The power level required to redact messages sent by other users.
     */
    get redactLevel(): number;
    /**
     * The power level required to send "@room" notifications.
     */
    get notifyWholeRoomLevel(): number;
    /**
     * The default power level for users.
     */
    get defaultUserLevel(): number;
    /**
     * The default power level required to send state events.
     */
    get defaultStateEventLevel(): number;
    /**
     * The default power level required to send room events.
     */
    get defaultEventLevel(): number;
}
