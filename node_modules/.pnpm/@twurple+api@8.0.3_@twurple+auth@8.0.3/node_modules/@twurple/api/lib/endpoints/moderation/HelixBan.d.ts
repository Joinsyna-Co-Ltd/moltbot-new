import { HelixBanUser } from './HelixBanUser.js';
/**
 * Information about the ban of a user.
 *
 * @inheritDoc
 */
export declare class HelixBan extends HelixBanUser {
    /**
     * The name of the user that was banned or put in a timeout.
     */
    get userName(): string;
    /**
     * The display name of the user that was banned or put in a timeout.
     */
    get userDisplayName(): string;
    /**
     * The name of the moderator that banned or put the user in the timeout.
     */
    get moderatorName(): string;
    /**
     * The display name of the moderator that banned or put the user in the timeout.
     */
    get moderatorDisplayName(): string;
    /**
     * The reason why the user was banned or timed out. Returns `null` if no reason was given.
     */
    get reason(): string | null;
}
//# sourceMappingURL=HelixBan.d.ts.map