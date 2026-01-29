import { DataObject } from '@twurple/common';
import type { HelixFollowedChannelData } from '../../interfaces/endpoints/channel.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * Represents a broadcaster that a user follows.
 */
export declare class HelixFollowedChannel extends DataObject<HelixFollowedChannelData> {
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets additional information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate(): Date;
}
//# sourceMappingURL=HelixFollowedChannel.d.ts.map