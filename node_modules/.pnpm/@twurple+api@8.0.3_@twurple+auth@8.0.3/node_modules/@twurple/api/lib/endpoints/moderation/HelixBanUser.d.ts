import { DataObject } from '@twurple/common';
import { type HelixCommonBanUserData } from '../../interfaces/endpoints/moderation.external.js';
import { type HelixUser } from '../user/HelixUser.js';
/**
 * Information about a user who has been banned/timed out.
 *
 * @hideProtected
 */
export declare class HelixBanUser extends DataObject<HelixCommonBanUserData> {
    /**
     * The date and time that the ban/timeout was created.
     */
    get creationDate(): Date;
    /**
     * The date and time that the timeout will end. Is `null` if the user was banned instead of put in a timeout.
     */
    get expiryDate(): Date | null;
    /**
     * The ID of the moderator that banned or put the user in the timeout.
     */
    get moderatorId(): string;
    /**
     * Gets more information about the moderator that banned or put the user in the timeout.
     */
    getModerator(): Promise<HelixUser>;
    /**
     * The ID of the user that was banned or put in a timeout.
     */
    get userId(): string;
    /**
     * Gets more information about the user that was banned or put in a timeout.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixBanUser.d.ts.map