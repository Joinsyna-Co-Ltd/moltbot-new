"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTopicEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.topic state event
 * @category Matrix events
 */
class RoomTopicEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The topic of the room.
     */
    get topic() {
        return this.content.topic;
    }
}
exports.RoomTopicEvent = RoomTopicEvent;
//# sourceMappingURL=RoomTopicEvent.js.map