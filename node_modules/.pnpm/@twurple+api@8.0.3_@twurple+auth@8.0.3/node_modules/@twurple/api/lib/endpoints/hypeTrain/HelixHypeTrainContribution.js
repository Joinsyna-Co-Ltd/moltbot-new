import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A Hype Train contributor.
 */
let HelixHypeTrainContribution = class HelixHypeTrainContribution extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user contributing to the Hype Train.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user contributing to the Hype Train.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user contributing to the Hype Train.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets additional information about the user contributing to the Hype Train.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The type of the Hype Train contribution.
     */
    get type() {
        return this[rawDataSymbol].type;
    }
    /**
     * The total contribution amount in subs or bits.
     */
    get total() {
        return this[rawDataSymbol].total;
    }
};
__decorate([
    Enumerable(false)
], HelixHypeTrainContribution.prototype, "_client", void 0);
HelixHypeTrainContribution = __decorate([
    rtfm('api', 'HelixHypeTrainContribution', 'userId')
], HelixHypeTrainContribution);
export { HelixHypeTrainContribution };
