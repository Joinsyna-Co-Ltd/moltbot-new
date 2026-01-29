"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.create state event
 * @category Matrix events
 */
class CreateEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The user ID who created the room.
     */
    get creator() {
        return this.sender;
    }
    /**
     * The version of the room. Defaults to "1".
     */
    get version() {
        return this.content.room_version || "1";
    }
    /**
     * Whether or not the room is federated. Default true (federated).
     */
    get federated() {
        return this.content['m.federate'] !== false;
    }
}
exports.CreateEvent = CreateEvent;
//# sourceMappingURL=CreateEvent.js.map