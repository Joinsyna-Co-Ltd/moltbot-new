import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about the Shield Mode status of a channel.
 */
let HelixShieldModeStatus = class HelixShieldModeStatus extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * Whether Shield Mode is active.
     */
    get isActive() {
        return this[rawDataSymbol].is_active;
    }
    /**
     * The ID of the moderator that last activated Shield Mode.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * The name of the moderator that last activated Shield Mode.
     */
    get moderatorName() {
        return this[rawDataSymbol].moderator_login;
    }
    /**
     * The display name of the moderator that last activated Shield Mode.
     */
    get moderatorDisplayName() {
        return this[rawDataSymbol].moderator_name;
    }
    /**
     * Gets more information about the moderator that last activated Shield Mode.
     */
    async getModerator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_id));
    }
    /**
     * The date when Shield Mode was last activated. `null` indicates Shield Mode hasn't been previously activated.
     */
    get lastActivationDate() {
        return this[rawDataSymbol].last_activated_at === '' ? null : new Date(this[rawDataSymbol].last_activated_at);
    }
};
__decorate([
    Enumerable(false)
], HelixShieldModeStatus.prototype, "_client", void 0);
HelixShieldModeStatus = __decorate([
    rtfm('api', 'HelixShieldModeStatus')
], HelixShieldModeStatus);
export { HelixShieldModeStatus };
