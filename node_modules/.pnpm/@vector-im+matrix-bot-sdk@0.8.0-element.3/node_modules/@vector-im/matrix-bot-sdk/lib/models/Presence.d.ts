import { PresenceEventContent, PresenceState } from "./events/PresenceEvent";
/**
 * Presence information for a user.
 * @category Models
 */
export declare class Presence {
    protected presence: PresenceEventContent;
    constructor(presence: PresenceEventContent);
    /**
     * The state for this presence update.
     */
    get state(): PresenceState;
    /**
     * The status message which accompanies this presence. May be falsey.
     */
    get statusMessage(): string;
    /**
     * How long ago in milliseconds this presence was changed. May be falsey.
     */
    get lastActiveAgo(): number;
    /**
     * Whether or not the user is currently active.
     */
    get currentlyActive(): boolean;
}
