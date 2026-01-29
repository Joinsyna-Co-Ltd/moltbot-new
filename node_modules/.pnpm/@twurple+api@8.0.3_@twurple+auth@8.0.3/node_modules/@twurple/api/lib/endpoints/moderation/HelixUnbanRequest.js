import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A request from a user to be unbanned from a channel.
 */
let HelixUnbanRequest = class HelixUnbanRequest extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * Unban request ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The display name of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * The name of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorName() {
        return this[rawDataSymbol].moderator_login;
    }
    /**
     * The display name of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorDisplayName() {
        return this[rawDataSymbol].moderator_name;
    }
    /**
     * Gets more information about the moderator.
     */
    async getModerator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_id));
    }
    /**
     * The ID of the user who requested to be unbanned.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user who requested to be unbanned.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user who requested to be unbanned.
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
    /**
     * Text message of the unban request from the requesting user.
     */
    get message() {
        return this[rawDataSymbol].text;
    }
    /**
     * The date of when the unban request was created.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The message written by the moderator who resolved the unban request, or `null` if it has not been resolved yet.
     */
    get resolutionMessage() {
        // Can be empty string and null
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this[rawDataSymbol].resolution_text || null;
    }
    /**
     * The date when the unban request was resolved, or `null` if it has not been resolved yet.
     */
    get resolutionDate() {
        return mapNullable(this[rawDataSymbol].resolved_at, val => new Date(val));
    }
};
__decorate([
    Enumerable(false)
], HelixUnbanRequest.prototype, "_client", void 0);
HelixUnbanRequest = __decorate([
    rtfm('api', 'HelixUnbanRequest', 'id')
], HelixUnbanRequest);
export { HelixUnbanRequest };
