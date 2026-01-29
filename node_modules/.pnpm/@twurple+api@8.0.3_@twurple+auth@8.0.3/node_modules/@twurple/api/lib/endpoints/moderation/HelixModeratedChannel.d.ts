import { DataObject } from '@twurple/common';
import type { HelixModeratedChannelData } from '../../interfaces/endpoints/moderation.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import type { HelixChannel } from '../channel/HelixChannel.js';
/**
 * A reference to a Twitch channel where a user is a moderator.
 */
export declare class HelixModeratedChannel extends DataObject<HelixModeratedChannelData> {
    /**
     * The ID of the channel.
     */
    get id(): string;
    /**
     * The name of the channel.
     */
    get name(): string;
    /**
     * The display name of the channel.
     */
    get displayName(): string;
    /**
     * Gets more information about the channel.
     */
    getChannel(): Promise<HelixChannel>;
    /**
     * Gets more information about the broadcaster of the channel.
     */
    getBroadcaster(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixModeratedChannel.d.ts.map