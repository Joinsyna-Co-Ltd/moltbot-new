import { DataObject } from '@twurple/common';
import { type HelixFollowData } from '../../interfaces/endpoints/user.external.js';
import type { HelixUser } from './HelixUser.js';
/**
 * A relation of a user following a broadcaster.
 */
export declare class HelixFollow extends DataObject<HelixFollowData> {
    /**
     * The user ID of the following user.
     */
    get userId(): string;
    /**
     * The name of the following user.
     */
    get userName(): string;
    /**
     * The display name of the following user.
     */
    get userDisplayName(): string;
    /**
     * Gets the data of the following user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The user ID of the followed broadcaster.
     */
    get followedUserId(): string;
    /**
     * The name of the followed user.
     */
    get followedUserName(): string;
    /**
     * The display name of the followed user.
     */
    get followedUserDisplayName(): string;
    /**
     * Gets the data of the followed broadcaster.
     */
    getFollowedUser(): Promise<HelixUser>;
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate(): Date;
}
//# sourceMappingURL=HelixFollow.d.ts.map