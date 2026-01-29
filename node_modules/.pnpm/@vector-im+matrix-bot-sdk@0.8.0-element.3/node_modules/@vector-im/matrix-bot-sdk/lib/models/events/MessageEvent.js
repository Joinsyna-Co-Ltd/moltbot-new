"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
const InvalidEventError_1 = require("./InvalidEventError");
/**
 * Represents an m.room.message room event
 * @category Matrix events
 */
class MessageEvent extends RoomEvent_1.RoomEvent {
    constructor(event) {
        super(event);
    }
    /**
     * Whether or not the event is redacted (or looked redacted).
     */
    get isRedacted() {
        // Presume the event redacted if we're missing a body or message type
        const noContent = !this.content.body && this.content.body !== "";
        const noMsgtype = !this.content.msgtype && this.content.msgtype !== "";
        return noContent || noMsgtype;
    }
    /**
     * The message's type.
     */
    get messageType() {
        const type = this.content.msgtype;
        if (!type && type !== "")
            throw new InvalidEventError_1.EventRedactedError("missing msgtype");
        return type;
    }
    /**
     * The `body` of the message.
     */
    get textBody() {
        const body = this.content.body;
        if (!body && body !== "")
            throw new InvalidEventError_1.EventRedactedError("missing body");
        return body;
    }
    /**
     * The `external_url` of the message, if it exists
     */
    get externalUrl() {
        return this.content.external_url || undefined;
    }
}
exports.MessageEvent = MessageEvent;
//# sourceMappingURL=MessageEvent.js.map