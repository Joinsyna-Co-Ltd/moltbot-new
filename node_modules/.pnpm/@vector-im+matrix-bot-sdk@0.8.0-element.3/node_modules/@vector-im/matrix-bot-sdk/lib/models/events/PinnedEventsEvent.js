"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedEventsEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.pinned_events state event
 * @category Matrix events
 */
class PinnedEventsEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The event IDs that are pinned in the room.
     */
    get pinnedEventIds() {
        return this.content.pinned || [];
    }
}
exports.PinnedEventsEvent = PinnedEventsEvent;
//# sourceMappingURL=PinnedEventsEvent.js.map