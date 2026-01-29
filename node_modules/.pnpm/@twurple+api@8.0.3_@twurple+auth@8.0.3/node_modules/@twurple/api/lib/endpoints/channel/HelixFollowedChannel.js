import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Represents a broadcaster that a user follows.
 */
let HelixFollowedChannel = class HelixFollowedChannel extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets additional information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate() {
        return new Date(this[rawDataSymbol].followed_at);
    }
};
__decorate([
    Enumerable(false)
], HelixFollowedChannel.prototype, "_client", void 0);
HelixFollowedChannel = __decorate([
    rtfm('api', 'HelixFollowedChannel', 'broadcasterId')
], HelixFollowedChannel);
export { HelixFollowedChannel };
