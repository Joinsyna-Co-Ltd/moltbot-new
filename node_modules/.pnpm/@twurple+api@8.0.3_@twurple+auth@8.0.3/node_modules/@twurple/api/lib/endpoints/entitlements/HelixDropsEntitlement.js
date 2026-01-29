import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An entitlement for a drop.
 */
let HelixDropsEntitlement = class HelixDropsEntitlement extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the entitlement.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the reward.
     */
    get rewardId() {
        return this[rawDataSymbol].benefit_id;
    }
    /**
     * The date when the entitlement was granted.
     */
    get grantDate() {
        return new Date(this[rawDataSymbol].timestamp);
    }
    /**
     * The ID of the entitled user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * Gets more information about the entitled user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The ID of the game the entitlement was granted for.
     */
    get gameId() {
        return this[rawDataSymbol].game_id;
    }
    /**
     * Gets more information about the game the entitlement was granted for.
     */
    async getGame() {
        return checkRelationAssertion(await this._client.games.getGameById(this[rawDataSymbol].game_id));
    }
    /**
     * The fulfillment status of the entitlement.
     */
    get fulfillmentStatus() {
        return this[rawDataSymbol].fulfillment_status;
    }
    /**
     * The date when the entitlement was last updated.
     */
    get updateDate() {
        return new Date(this[rawDataSymbol].last_updated);
    }
};
__decorate([
    Enumerable(false)
], HelixDropsEntitlement.prototype, "_client", void 0);
HelixDropsEntitlement = __decorate([
    rtfm('api', 'HelixDropsEntitlement')
], HelixDropsEntitlement);
export { HelixDropsEntitlement };
