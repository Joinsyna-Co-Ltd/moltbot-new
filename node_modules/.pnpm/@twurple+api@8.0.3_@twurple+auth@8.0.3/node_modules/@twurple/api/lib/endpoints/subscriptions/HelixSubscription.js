import { __decorate } from "tslib";
import { checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixUserSubscription } from './HelixUserSubscription.js';
/**
 * A (paid) subscription of a user to a broadcaster.
 *
 * @inheritDoc
 */
let HelixSubscription = class HelixSubscription extends HelixUserSubscription {
    /**
     * The user ID of the broadcaster.
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
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The user ID of the gifter.
     */
    get gifterId() {
        return this[rawDataSymbol].is_gift ? this[rawDataSymbol].gifter_id : null;
    }
    /**
     * The name of the gifter.
     */
    get gifterName() {
        return this[rawDataSymbol].is_gift ? this[rawDataSymbol].gifter_login : null;
    }
    /**
     * The display name of the gifter.
     */
    get gifterDisplayName() {
        return this[rawDataSymbol].is_gift ? this[rawDataSymbol].gifter_name : null;
    }
    /**
     * Gets more information about the gifter.
     */
    async getGifter() {
        return this[rawDataSymbol].is_gift
            ? checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].gifter_id))
            : null;
    }
    /**
     * The user ID of the subscribed user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the subscribed user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the subscribed user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the subscribed user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
HelixSubscription = __decorate([
    rtfm('api', 'HelixSubscription', 'userId')
], HelixSubscription);
export { HelixSubscription };
