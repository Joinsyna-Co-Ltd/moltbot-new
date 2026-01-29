"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateEvent = exports.RoomEvent = void 0;
const Event_1 = require("./Event");
/**
 * A Matrix room event.
 * @category Matrix events
 */
class RoomEvent extends Event_1.MatrixEvent {
    event;
    constructor(event) {
        super(event);
        this.event = event;
    }
    /**
     * The event ID of this event.
     */
    get eventId() {
        return this.event['event_id'];
    }
    /**
     * The timestamp in milliseconds this event was sent.
     */
    get timestamp() {
        return this.event['origin_server_ts'];
    }
    /**
     * The unsigned content for this event. May have no properties.
     */
    get unsigned() {
        return this.event['unsigned'] || {};
    }
}
exports.RoomEvent = RoomEvent;
/**
 * A room state event.
 * @category Matrix events
 */
class StateEvent extends RoomEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The state key for this event. May be an empty string.
     */
    get stateKey() {
        return this.event['state_key'];
    }
    /**
     * The previous content for this state event. Will be an empty
     * object if there is no previous content.
     */
    get previousContent() {
        return this.unsigned['prev_content'] || this.event['prev_content'] || {}; // v2, v1, fallback
    }
}
exports.StateEvent = StateEvent;
//# sourceMappingURL=RoomEvent.js.map