import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * The result of a channel search.
 */
let HelixChannelSearchResult = class HelixChannelSearchResult extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The language of the channel.
     */
    get language() {
        return this[rawDataSymbol].broadcaster_language;
    }
    /**
     * The ID of the channel.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The name of the channel.
     */
    get name() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the channel.
     */
    get displayName() {
        return this[rawDataSymbol].display_name;
    }
    /**
     * Gets additional information about the owner of the channel.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].id));
    }
    /**
     * The ID of the game currently played on the channel.
     */
    get gameId() {
        return this[rawDataSymbol].game_id;
    }
    /**
     * The name of the game currently played on the channel.
     */
    get gameName() {
        return this[rawDataSymbol].game_name;
    }
    /**
     * Gets information about the game that is being played on the stream.
     */
    async getGame() {
        return this[rawDataSymbol].game_id
            ? checkRelationAssertion(await this._client.games.getGameById(this[rawDataSymbol].game_id))
            : null;
    }
    /**
     * Whether the channel is currently live.
     */
    get isLive() {
        return this[rawDataSymbol].is_live;
    }
    /**
     * The tags applied to the channel.
     */
    get tags() {
        return this[rawDataSymbol].tags;
    }
    /**
     * The thumbnail URL of the stream.
     */
    get thumbnailUrl() {
        return this[rawDataSymbol].thumbnail_url;
    }
    /**
     * The start date of the stream. Returns `null` if the stream is not live.
     */
    get startDate() {
        return this[rawDataSymbol].is_live ? new Date(this[rawDataSymbol].started_at) : null;
    }
};
__decorate([
    Enumerable(false)
], HelixChannelSearchResult.prototype, "_client", void 0);
HelixChannelSearchResult = __decorate([
    rtfm('api', 'HelixChannelSearchResult', 'id')
], HelixChannelSearchResult);
export { HelixChannelSearchResult };
