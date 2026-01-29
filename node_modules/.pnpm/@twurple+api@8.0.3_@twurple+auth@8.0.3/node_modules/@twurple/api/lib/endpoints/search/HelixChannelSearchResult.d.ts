import { DataObject } from '@twurple/common';
import { type HelixChannelSearchResultData } from '../../interfaces/endpoints/search.external.js';
import type { HelixGame } from '../game/HelixGame.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * The result of a channel search.
 */
export declare class HelixChannelSearchResult extends DataObject<HelixChannelSearchResultData> {
    /**
     * The language of the channel.
     */
    get language(): string;
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
     * Gets additional information about the owner of the channel.
     */
    getUser(): Promise<HelixUser>;
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
     * Whether the channel is currently live.
     */
    get isLive(): boolean;
    /**
     * The tags applied to the channel.
     */
    get tags(): string[];
    /**
     * The thumbnail URL of the stream.
     */
    get thumbnailUrl(): string;
    /**
     * The start date of the stream. Returns `null` if the stream is not live.
     */
    get startDate(): Date | null;
}
//# sourceMappingURL=HelixChannelSearchResult.d.ts.map