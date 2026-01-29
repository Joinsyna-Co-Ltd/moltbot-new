import { DataObject } from '@twurple/common';
import { type HelixChannelReferenceData } from '../../interfaces/endpoints/channel.external.js';
import type { HelixGame } from '../game/HelixGame.js';
import type { HelixUser } from '../user/HelixUser.js';
import type { HelixChannel } from './HelixChannel.js';
/**
 * A reference to a Twitch channel.
 */
export declare class HelixChannelReference extends DataObject<HelixChannelReferenceData> {
    /**
     * The ID of the channel.
     */
    get id(): string;
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
    /**
     * The ID of the game currently played on the channel.
     */
    get gameId(): string;
    /**
     * The name of the game currently played on the channel.
     */
    get gameName(): string;
    /**
     * Gets information about the game that is being played on the stream.
     */
    getGame(): Promise<HelixGame | null>;
    /**
     * The title of the channel.
     */
    get title(): string;
}
//# sourceMappingURL=HelixChannelReference.d.ts.map