import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A shared chat session participant.
 */
let HelixSharedChatSessionParticipant = class HelixSharedChatSessionParticipant extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the participant broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * Gets information about the participant broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
};
__decorate([
    Enumerable(false)
], HelixSharedChatSessionParticipant.prototype, "_client", void 0);
HelixSharedChatSessionParticipant = __decorate([
    rtfm('api', 'HelixSharedChatSessionParticipant', 'broadcasterId')
], HelixSharedChatSessionParticipant);
export { HelixSharedChatSessionParticipant };
