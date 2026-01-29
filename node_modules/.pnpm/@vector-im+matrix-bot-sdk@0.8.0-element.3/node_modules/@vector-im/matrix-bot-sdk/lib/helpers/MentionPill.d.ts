import { MatrixClient } from "../MatrixClient";
/**
 * Represents a system for generating a mention pill for an entity.
 * @category Utilities
 */
export declare class MentionPill {
    private entityPermalink;
    private displayName;
    private constructor();
    /**
     * The HTML component of the mention.
     */
    get html(): string;
    /**
     * The plain text component of the mention.
     */
    get text(): string;
    /**
     * Creates a new mention for a user in an optional room.
     * @param {string} userId The user ID the mention is for.
     * @param {String} inRoomId Optional room ID the user is being mentioned in, for the aesthetics of the mention.
     * @param {MatrixClient} client Optional client for creating a more pleasing mention.
     * @returns {Promise<MentionPill>} Resolves to the user's mention.
     */
    static forUser(userId: string, inRoomId?: string, client?: MatrixClient): Promise<MentionPill>;
    /**
     * Creates a new mention for a room (not @room, but the room itself to be linked).
     * @param {string} roomIdOrAlias The room ID or alias to mention.
     * @param {MatrixClient} client Optional client for creating a more pleasing mention.
     * @returns {Promise<MentionPill>} Resolves to the room's mention.
     */
    static forRoom(roomIdOrAlias: string, client?: MatrixClient): Promise<MentionPill>;
    /**
     * Creates a mention from static information.
     * @param {string} userId The user ID the mention is for.
     * @param {string} displayName The user's display name.
     * @returns {MentionPill} The mention for the user.
     */
    static withDisplayName(userId: string, displayName: string): MentionPill;
}
