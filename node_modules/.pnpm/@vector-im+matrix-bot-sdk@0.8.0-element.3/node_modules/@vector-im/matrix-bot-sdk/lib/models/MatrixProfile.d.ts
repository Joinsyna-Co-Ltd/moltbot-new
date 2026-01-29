import { MentionPill } from "..";
/**
 * Profile information commonly associated with Matrix profiles
 * @category Models
 */
export interface MatrixProfileInfo {
    /**
     * The display name of the user, if any.
     */
    displayname?: string;
    /**
     * A URL to the user's avatar, if any.
     */
    avatar_url?: string;
}
/**
 * Represents a user's profile, possibly in a room.
 * @category Models
 */
export declare class MatrixProfile {
    private userId;
    private profile;
    /**
     * Creates a new profile representation for a user.
     * @param {string} userId The user ID the profile is for.
     * @param {MatrixProfile} profile The profile itself.
     */
    constructor(userId: string, profile: MatrixProfileInfo);
    /**
     * The display name for the user. This will always return a value, though it
     * may be based upon their user ID if no explicit display name is set.
     */
    get displayName(): string;
    /**
     * The avatar URL for the user. If the user does not have an avatar, this will
     * be null.
     */
    get avatarUrl(): string;
    /**
     * A mention pill for this user.
     */
    get mention(): MentionPill;
}
