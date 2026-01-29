import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A reference to a Twitch channel.
 */
let HelixChannelReference = class HelixChannelReference extends DataObject {
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
     * The display name of the channel.
     */
    get displayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the channel.
     */
    async getChannel() {
        return checkRelationAssertion(await this._client.channels.getChannelInfoById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * Gets more information about the broadcaster of the channel.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
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
};
__decorate([
    Enumerable(false)
], HelixChannelReference.prototype, "_client", void 0);
HelixChannelReference = __decorate([
    rtfm('api', 'HelixChannelReference', 'id')
], HelixChannelReference);
export { HelixChannelReference };
