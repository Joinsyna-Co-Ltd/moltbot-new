"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomNameEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.name state event
 * @category Matrix events
 */
class RoomNameEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The name of the room.
     */
    get name() {
        return this.content.name;
    }
}
exports.RoomNameEvent = RoomNameEvent;
//# sourceMappingURL=RoomNameEvent.js.map