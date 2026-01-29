import { type BaseApiClient } from '../../client/BaseApiClient.js';
import { type HelixChannelEmoteData, type HelixChannelEmoteSubscriptionTier } from '../../interfaces/endpoints/chat.external.js';
import { HelixEmote } from './HelixEmote.js';
import type { HelixEmoteFromSet } from './HelixEmoteFromSet.js';
/**
 * A Twitch Channel emote.
 *
 * @inheritDoc
 */
export declare class HelixChannelEmote extends HelixEmote {
    constructor(data: HelixChannelEmoteData, client: BaseApiClient);
    /**
     * The subscription tier necessary to unlock the emote, or null if the emote is not a subscription emote.
     */
    get tier(): HelixChannelEmoteSubscriptionTier | null;
    /**
     * The type of the emote.
     *
     * There are many types of emotes that Twitch seems to arbitrarily assign. Do not rely on this value.
     */
    get type(): string;
    /**
     * The ID of the emote set the emote is part of.
     */
    get emoteSetId(): string;
    /**
     * Gets all emotes from the emote's set.
     */
    getAllEmotesFromSet(): Promise<HelixEmoteFromSet[]>;
}
//# sourceMappingURL=HelixChannelEmote.d.ts.map