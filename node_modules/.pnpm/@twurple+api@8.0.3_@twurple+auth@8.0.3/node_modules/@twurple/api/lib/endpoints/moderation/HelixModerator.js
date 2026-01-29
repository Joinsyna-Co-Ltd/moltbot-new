import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about the moderator status of a user.
 */
let HelixModerator = class HelixModerator extends DataObject {
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
     * Gets more information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixModerator.prototype, "_client", void 0);
HelixModerator = __decorate([
    rtfm('api', 'HelixModerator', 'userId')
], HelixModerator);
export { HelixModerator };
