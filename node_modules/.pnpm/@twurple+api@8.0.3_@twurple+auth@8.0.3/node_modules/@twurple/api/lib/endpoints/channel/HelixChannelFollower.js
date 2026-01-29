import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Represents a user that follows a channel.
 */
let HelixChannelFollower = class HelixChannelFollower extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets additional information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
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
], HelixChannelFollower.prototype, "_client", void 0);
HelixChannelFollower = __decorate([
    rtfm('api', 'HelixChannelFollower', 'userId')
], HelixChannelFollower);
export { HelixChannelFollower };
