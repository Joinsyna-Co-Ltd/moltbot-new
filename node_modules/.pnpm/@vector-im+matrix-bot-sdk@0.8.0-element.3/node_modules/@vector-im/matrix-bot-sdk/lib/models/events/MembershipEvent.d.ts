import { StateEvent } from "./RoomEvent";
/**
 * The types of membership that are valid in Matrix.
 * @category Matrix event info
 * @see MembershipEventContent
 */
export type Membership = "join" | "leave" | "ban" | "invite";
/**
 * The effective membership states a user can be in.
 * @category Matrix event info
 * @see MembershipEventContent
 */
export type EffectiveMembership = "join" | "leave" | "invite";
/**
 * The content definition for m.room.member events
 * @category Matrix event contents
 * @see MembershipEvent
 */
export interface MembershipEventContent {
    avatar_url?: string;
    displayname?: string;
    reason?: string;
    membership: Membership;
    is_direct?: boolean;
    unsigned?: any;
    third_party_invite?: {
        display_name: string;
        signed: any;
    };
}
/**
 * Represents an m.room.member state event
 * @category Matrix events
 */
export declare class MembershipEvent extends StateEvent<MembershipEventContent> {
    constructor(event: any);
    /**
     * True if the membership event targets the sender. False otherwise.
     *
     * This will typically by false for kicks and bans.
     */
    get ownMembership(): boolean;
    /**
     * The reason why a user may have sent this membership.
     */
    get reason(): string | undefined;
    /**
     * The user ID the membership affects.
     */
    get membershipFor(): string;
    /**
     * The user's membership.
     */
    get membership(): Membership;
    /**
     * The user's effective membership.
     */
    get effectiveMembership(): EffectiveMembership;
}
