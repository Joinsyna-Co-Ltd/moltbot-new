import { DataObject } from '@twurple/common';
import type { HelixChannelFollowerData } from '../../interfaces/endpoints/channel.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * Represents a user that follows a channel.
 */
export declare class HelixChannelFollower extends DataObject<HelixChannelFollowerData> {
    /**
     * The ID of the user.
     */
    get userId(): string;
    /**
     * The name of the user.
     */
    get userName(): string;
    /**
     * The display name of the user.
     */
    get userDisplayName(): string;
    /**
     * Gets additional information about the user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate(): Date;
}
//# sourceMappingURL=HelixChannelFollower.d.ts.map