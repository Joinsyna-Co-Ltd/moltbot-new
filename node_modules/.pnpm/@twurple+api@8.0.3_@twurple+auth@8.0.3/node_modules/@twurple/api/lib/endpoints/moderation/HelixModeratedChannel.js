import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A reference to a Twitch channel where a user is a moderator.
 */
let HelixModeratedChannel = class HelixModeratedChannel extends DataObject {
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
};
__decorate([
    Enumerable(false)
], HelixModeratedChannel.prototype, "_client", void 0);
HelixModeratedChannel = __decorate([
    rtfm('api', 'HelixModeratedChannel', 'id')
], HelixModeratedChannel);
export { HelixModeratedChannel };
