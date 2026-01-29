import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about a word or phrase blocked in a broadcaster's channel.
 */
let HelixBlockedTerm = class HelixBlockedTerm extends DataObject {
    /**
     * The ID of the broadcaster that owns the list of blocked terms.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The date and time of when the term was blocked.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The date and time of when the blocked term is set to expire. After the block expires, users will be able to use the term in the broadcaster’s chat room.
     * Is `null` if the term was added manually or permanently blocked by AutoMod.
     */
    get expirationDate() {
        return this[rawDataSymbol].expires_at ? new Date(this[rawDataSymbol].expires_at) : null;
    }
    /**
     * An ID that uniquely identifies this blocked term.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the moderator that blocked the word or phrase from being used in the broadcaster’s chat room.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * The blocked word or phrase.
     */
    get text() {
        return this[rawDataSymbol].text;
    }
    /**
     * The date and time of when the term was updated.
     */
    get updatedDate() {
        return new Date(this[rawDataSymbol].updated_at);
    }
};
HelixBlockedTerm = __decorate([
    rtfm('api', 'HelixBlockedTerm', 'id')
], HelixBlockedTerm);
export { HelixBlockedTerm };
