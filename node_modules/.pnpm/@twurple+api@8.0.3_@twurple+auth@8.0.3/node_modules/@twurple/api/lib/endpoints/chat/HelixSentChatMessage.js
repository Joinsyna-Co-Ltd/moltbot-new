import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about a sent Twitch chat message.
 */
let HelixSentChatMessage = class HelixSentChatMessage extends DataObject {
    /**
     * The message ID of the sent message.
     */
    get id() {
        return this[rawDataSymbol].message_id;
    }
    /**
     * If the message passed all checks and was sent.
     */
    get isSent() {
        return this[rawDataSymbol].is_sent;
    }
    /**
     * The reason code for why the chat message was dropped, if dropped.
     */
    get dropReasonCode() {
        return this[rawDataSymbol].drop_reason?.code;
    }
    /**
     * The reason message for why the chat message was dropped, if dropped.
     */
    get dropReasonMessage() {
        return this[rawDataSymbol].drop_reason?.message;
    }
};
HelixSentChatMessage = __decorate([
    rtfm('api', 'HelixSentChatMessage', 'id')
], HelixSentChatMessage);
export { HelixSentChatMessage };
