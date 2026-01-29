"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedactionEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.redaction room event
 * @category Matrix events
 */
class RedactionEvent extends RoomEvent_1.RoomEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The event ID this event redacts.
     * @deprecated It is possible for multiple events to be redacted depending on the room version.
     */
    get redactsEventId() {
        return this.redactsEventIds[0];
    }
    /**
     * The event IDs this event redacts.
     */
    get redactsEventIds() {
        if (Array.isArray(this.content.redacts)) {
            return this.content.redacts;
        }
        else if (this.content.redacts) {
            return [this.content.redacts];
        }
        else {
            return [this.event['redacts']];
        }
    }
}
exports.RedactionEvent = RedactionEvent;
//# sourceMappingURL=RedactionEvent.js.map