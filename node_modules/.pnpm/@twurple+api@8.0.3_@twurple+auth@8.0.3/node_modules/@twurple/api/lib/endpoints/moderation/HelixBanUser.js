import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about a user who has been banned/timed out.
 *
 * @hideProtected
 */
let HelixBanUser = class HelixBanUser extends DataObject {
    /** @internal */ _client;
    /** @internal */ _expiryTimestamp;
    /** @internal */
    constructor(data, expiryTimestamp, client) {
        super(data);
        this._expiryTimestamp = expiryTimestamp;
        this._client = client;
    }
    /**
     * The date and time that the ban/timeout was created.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The date and time that the timeout will end. Is `null` if the user was banned instead of put in a timeout.
     */
    get expiryDate() {
        return mapNullable(this._expiryTimestamp, ts => new Date(ts));
    }
    /**
     * The ID of the moderator that banned or put the user in the timeout.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * Gets more information about the moderator that banned or put the user in the timeout.
     */
    async getModerator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_id));
    }
    /**
     * The ID of the user that was banned or put in a timeout.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * Gets more information about the user that was banned or put in a timeout.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixBanUser.prototype, "_client", void 0);
__decorate([
    Enumerable(false)
], HelixBanUser.prototype, "_expiryTimestamp", void 0);
HelixBanUser = __decorate([
    rtfm('api', 'HelixBanUser', 'userId')
], HelixBanUser);
export { HelixBanUser };
