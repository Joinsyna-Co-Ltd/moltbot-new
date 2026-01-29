import { type HelixUserEmoteData } from '../../interfaces/endpoints/chat.external.js';
import { HelixEmoteBase } from './HelixEmoteBase.js';
import type { BaseApiClient } from '../../client/BaseApiClient.js';
import type { HelixEmoteFromSet } from './HelixEmoteFromSet.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A Twitch user emote.
 */
export declare class HelixUserEmote extends HelixEmoteBase {
    constructor(data: HelixUserEmoteData, client: BaseApiClient);
    /**
     * The type of the emote.
     *
     * There are many types of emotes that Twitch seems to arbitrarily assign.
     * Check the relevant values in the official documentation.
     *
     * @see https://dev.twitch.tv/docs/api/reference/#get-user-emotes
     */
    get type(): string;
    /**
     * The ID that identifies the emote set that the emote belongs to, or `null` if the emote is not from any set.
     */
    get emoteSetId(): string | null;
    /**
     * The ID of the broadcaster who owns the emote, or `null` if the emote has no owner, e.g. it's a global emote.
     */
    get ownerId(): string | null;
    /**
     * Gets all emotes from the emotes set, or `null` if emote is not from any set.
     */
    getAllEmotesFromSet(): Promise<HelixEmoteFromSet[] | null>;
    /**
     * Gets more information about the user that owns the emote, or `null` if the emote is not owned by a user.
     */
    getOwner(): Promise<HelixUser | null>;
}
//# sourceMappingURL=HelixUserEmote.d.ts.map