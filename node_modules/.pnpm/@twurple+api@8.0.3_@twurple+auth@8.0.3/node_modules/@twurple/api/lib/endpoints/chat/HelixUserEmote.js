import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixEmoteBase } from './HelixEmoteBase.js';
import { Enumerable } from '@d-fischer/shared-utils';
/**
 * A Twitch user emote.
 */
let HelixUserEmote = class HelixUserEmote extends HelixEmoteBase {
    /** @internal */ _client;
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The type of the emote.
     *
     * There are many types of emotes that Twitch seems to arbitrarily assign.
     * Check the relevant values in the official documentation.
     *
     * @see https://dev.twitch.tv/docs/api/reference/#get-user-emotes
     */
    get type() {
        return this[rawDataSymbol].emote_type;
    }
    /**
     * The ID that identifies the emote set that the emote belongs to, or `null` if the emote is not from any set.
     */
    get emoteSetId() {
        return this[rawDataSymbol].emote_set_id || null;
    }
    /**
     * The ID of the broadcaster who owns the emote, or `null` if the emote has no owner, e.g. it's a global emote.
     */
    get ownerId() {
        return this[rawDataSymbol].owner_id || null;
    }
    /**
     * Gets all emotes from the emotes set, or `null` if emote is not from any set.
     */
    async getAllEmotesFromSet() {
        return this[rawDataSymbol].emote_set_id
            ? await this._client.chat.getEmotesFromSets([this[rawDataSymbol].emote_set_id])
            : null;
    }
    /**
     * Gets more information about the user that owns the emote, or `null` if the emote is not owned by a user.
     */
    async getOwner() {
        return this[rawDataSymbol].owner_id ? await this._client.users.getUserById(this[rawDataSymbol].owner_id) : null;
    }
};
__decorate([
    Enumerable(false)
], HelixUserEmote.prototype, "_client", void 0);
HelixUserEmote = __decorate([
    rtfm('api', 'HelixUserEmote', 'id')
], HelixUserEmote);
export { HelixUserEmote };
