import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A participant of a shared Hype Train.
 */
let HelixHypeTrainSharedParticipant = class HelixHypeTrainSharedParticipant extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user participating in the shared Hype Train.
     */
    get userId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the user participating in the shared Hype Train.
     */
    get userName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the user participating in the shared Hype Train.
     */
    get userDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets additional information about the user participating in the shared Hype Train.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixHypeTrainSharedParticipant.prototype, "_client", void 0);
HelixHypeTrainSharedParticipant = __decorate([
    rtfm('api', 'HelixHypeTrainSharedParticipant', 'userId')
], HelixHypeTrainSharedParticipant);
export { HelixHypeTrainSharedParticipant };
