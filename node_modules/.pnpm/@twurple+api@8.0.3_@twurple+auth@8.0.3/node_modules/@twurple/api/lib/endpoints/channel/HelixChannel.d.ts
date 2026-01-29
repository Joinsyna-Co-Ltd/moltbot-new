import { DataObject } from '@twurple/common';
import { type HelixChannelData } from '../../interfaces/endpoints/channel.external.js';
import type { HelixGame } from '../game/HelixGame.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A Twitch channel.
 */
export declare class HelixChannel extends DataObject<HelixChannelData> {
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
     * Gets more information about the broadcaster of the channel.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The language of the channel.
     */
    get language(): string;
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
    /**
     * The stream delay of the channel, in seconds.
     *
     * If you didn't request this with broadcaster access, this is always zero.
     */
    get delay(): number;
    /**
     * The tags applied to the channel.
     */
    get tags(): string[];
    /**
     * The content classification labels applied to the channel.
     */
    get contentClassificationLabels(): string[];
    /**
     * Whether the channel currently displays branded content (as specified by the broadcaster).
     */
    get isBrandedContent(): boolean;
}
//# sourceMappingURL=HelixChannel.d.ts.map