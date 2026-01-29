/**
 * A user in chat.
 */
export declare class ChatUser {
    private readonly _userName;
    private static _parseBadgesLike;
    /**
     * The name of the user.
     */
    get userName(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * The color the user chose to display in chat.
     *
     * Returns undefined if the user didn't choose a color.
     * In this case, you should generate your own color for this user and stick to it at least for one runtime.
     */
    get color(): string | undefined;
    /**
     * The badges of the user. Returned as a map that maps the badge category to the detail.
     */
    get badges(): Map<string, string>;
    /**
     * The badge info of the user. Returned as a map that maps the badge category to the detail.
     */
    get badgeInfo(): Map<string, string>;
    /**
     * The ID of the user.
     */
    get userId(): string;
    /**
     * The type of the user.
     * Possible values are undefined, 'mod', 'global_mod', 'admin' and 'staff'.
     */
    get userType(): string | undefined;
    /**
     * Whether the user is the broadcaster.
     */
    get isBroadcaster(): boolean;
    /**
     * Whether the user is subscribed to the channel.
     */
    get isSubscriber(): boolean;
    /**
     * Whether the user is a Founder of the channel.
     */
    get isFounder(): boolean;
    /**
     * Whether the user is a moderator of the channel.
     */
    get isMod(): boolean;
    /**
     * Whether the user is a lead moderator of the channel.
     */
    get isLeadMod(): boolean;
    /**
     * Whether the user is a VIP in the channel.
     */
    get isVip(): boolean;
    /**
     * Whether the user is an artist of the channel.
     */
    get isArtist(): boolean;
}
//# sourceMappingURL=ChatUser.d.ts.map