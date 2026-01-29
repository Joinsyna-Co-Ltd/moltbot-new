import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A relation of anything with a user.
 */
let HelixUserRelation = class HelixUserRelation extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user.
     */
    get id() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get name() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get displayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets additional information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixUserRelation.prototype, "_client", void 0);
HelixUserRelation = __decorate([
    rtfm('api', 'HelixUserRelation', 'id')
], HelixUserRelation);
export { HelixUserRelation };
