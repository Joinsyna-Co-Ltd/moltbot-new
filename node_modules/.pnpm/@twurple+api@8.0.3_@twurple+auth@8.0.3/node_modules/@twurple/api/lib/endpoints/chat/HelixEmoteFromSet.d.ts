import { type BaseApiClient } from '../../client/BaseApiClient.js';
import { type HelixEmoteFromSetData } from '../../interfaces/endpoints/chat.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixEmote } from './HelixEmote.js';
/**
 * A Twitch Channel emote.
 *
 * @inheritDoc
 */
export declare class HelixEmoteFromSet extends HelixEmote {
    constructor(data: HelixEmoteFromSetData, client: BaseApiClient);
    /**
     * The type of the emote.
     *
     * Known values are: `subscriptions`, `bitstier`, `follower`, `rewards`, `globals`, `smilies`, `prime`, `limitedtime`.
     *
     * This list may be non-exhaustive.
     */
    get type(): string;
    /**
     * The ID of the emote set the emote is part of.
     */
    get emoteSetId(): string;
    /**
     * The ID of the user that owns the emote, or null if the emote is not owned by a user.
     */
    get ownerId(): string | null;
    /**
     * Gets more information about the user that owns the emote, or null if the emote is not owned by a user.
     */
    getOwner(): Promise<HelixUser | null>;
}
//# sourceMappingURL=HelixEmoteFromSet.d.ts.map