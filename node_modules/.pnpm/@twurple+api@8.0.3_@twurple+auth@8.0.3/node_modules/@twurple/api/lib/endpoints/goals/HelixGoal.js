import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A creator goal.
 */
let HelixGoal = class HelixGoal extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the goal.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster the goal belongs to.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The display name of the broadcaster the goal belongs to.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * The name of the broadcaster the goal belongs to.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The type of the goal.
     */
    get type() {
        return this[rawDataSymbol].type;
    }
    /**
     * The description of the goal.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
    /**
     * The current value of the goal.
     */
    get currentAmount() {
        return this[rawDataSymbol].current_amount;
    }
    /**
     * The target value of the goal.
     */
    get targetAmount() {
        return this[rawDataSymbol].target_amount;
    }
    /**
     * The date and time when the goal was created.
     */
    get creationDate() {
        return this[rawDataSymbol].created_at;
    }
};
__decorate([
    Enumerable(false)
], HelixGoal.prototype, "_client", void 0);
HelixGoal = __decorate([
    rtfm('api', 'HelixGoal', 'id')
], HelixGoal);
export { HelixGoal };
