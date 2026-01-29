import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about the warning.
 */
let HelixWarning = class HelixWarning extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the channel in which the warning will take effect.
     */
    get broadcasterId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the user who applied the warning.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * Gets more information about the moderator.
     */
    async getModerator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_id));
    }
    /**
     * The ID of the warned user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The reason provided for the warning.
     */
    get reason() {
        return this[rawDataSymbol].reason;
    }
};
__decorate([
    Enumerable(false)
], HelixWarning.prototype, "_client", void 0);
HelixWarning = __decorate([
    rtfm('api', 'HelixWarning', 'userId')
], HelixWarning);
export { HelixWarning };
