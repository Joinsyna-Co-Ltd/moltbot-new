import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixSharedChatSessionParticipant } from './HelixSharedChatSessionParticipant.js';
/**
 * A shared chat session.
 */
let HelixSharedChatSession = class HelixSharedChatSession extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The unique identifier for the shared chat session.
     */
    get sessionId() {
        return this[rawDataSymbol].session_id;
    }
    /**
     * The ID of the host broadcaster.
     */
    get hostBroadcasterId() {
        return this[rawDataSymbol].host_broadcaster_id;
    }
    /**
     * Gets information about the host broadcaster.
     */
    async getHostBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].host_broadcaster_id));
    }
    /**
     * The list of participants in the session.
     */
    get participants() {
        return this[rawDataSymbol].participants.map(data => new HelixSharedChatSessionParticipant(data, this._client));
    }
    /**
     * The date for when the session was created.
     */
    get createdDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The date for when the session was updated.
     */
    get updatedDate() {
        return new Date(this[rawDataSymbol].updated_at);
    }
};
__decorate([
    Enumerable(false)
], HelixSharedChatSession.prototype, "_client", void 0);
HelixSharedChatSession = __decorate([
    rtfm('api', 'HelixSharedChatSession', 'sessionId')
], HelixSharedChatSession);
export { HelixSharedChatSession };
