import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An user blocked by a previously given user.
 */
let HelixUserBlock = class HelixUserBlock extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the blocked user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the blocked user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the blocked user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].display_name;
    }
    /**
     * Gets additional information about the blocked user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixUserBlock.prototype, "_client", void 0);
HelixUserBlock = __decorate([
    rtfm('api', 'HelixUserBlock', 'userId')
], HelixUserBlock);
export { HelixUserBlock };
