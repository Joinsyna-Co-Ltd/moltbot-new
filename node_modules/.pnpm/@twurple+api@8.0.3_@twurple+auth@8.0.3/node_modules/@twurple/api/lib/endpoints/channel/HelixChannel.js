import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A Twitch channel.
 */
let HelixChannel = class HelixChannel extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the channel.
     */
    get id() {
        return this[rawDataSymbol].broadcaster_id;
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
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster of the channel.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The language of the channel.
     */
    get language() {
        return this[rawDataSymbol].broadcaster_language;
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
     * The title of the channel.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The stream delay of the channel, in seconds.
     *
     * If you didn't request this with broadcaster access, this is always zero.
     */
    get delay() {
        return this[rawDataSymbol].delay;
    }
    /**
     * The tags applied to the channel.
     */
    get tags() {
        return this[rawDataSymbol].tags;
    }
    /**
     * The content classification labels applied to the channel.
     */
    get contentClassificationLabels() {
        return this[rawDataSymbol].content_classification_labels;
    }
    /**
     * Whether the channel currently displays branded content (as specified by the broadcaster).
     */
    get isBrandedContent() {
        return this[rawDataSymbol].is_branded_content;
    }
};
__decorate([
    Enumerable(false)
], HelixChannel.prototype, "_client", void 0);
HelixChannel = __decorate([
    rtfm('api', 'HelixChannel', 'id')
], HelixChannel);
export { HelixChannel };
