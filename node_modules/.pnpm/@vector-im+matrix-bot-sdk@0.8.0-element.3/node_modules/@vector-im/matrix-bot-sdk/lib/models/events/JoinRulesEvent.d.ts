import { StateEvent } from "./RoomEvent";
/**
 * The types of join rules that are valid in Matrix.
 * @category Matrix event info
 * @see JoinRulesEventContent
 */
export type JoinRule = "public" | "knock" | "invite" | "private";
/**
 * The content definition for m.room.join_rules events
 * @category Matrix event contents
 * @see JoinRulesEvent
 */
export interface JoinRulesEventContent {
    /**
     * The join rule for the room.
     */
    join_rule: JoinRule;
}
/**
 * Represents an m.room.join_rules state event
 * @category Matrix events
 */
export declare class JoinRulesEvent extends StateEvent<JoinRulesEventContent> {
    constructor(event: any);
    /**
     * The join rule for the room.
     */
    get rule(): JoinRule;
}
