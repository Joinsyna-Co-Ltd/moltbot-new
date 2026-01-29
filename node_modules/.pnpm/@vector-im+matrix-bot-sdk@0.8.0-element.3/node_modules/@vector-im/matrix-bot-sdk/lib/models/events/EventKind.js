"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventKind = void 0;
/**
 * Represents the different kinds of events a bot/appservice might see.
 * @category Matrix events
 */
var EventKind;
(function (EventKind) {
    /**
     * A room event. This could be a message event or a state event, and is associated with
     * a room.
     */
    EventKind["RoomEvent"] = "room";
    /**
     * An ephemeral event, such as typing notifications or presence.
     */
    EventKind["EphemeralEvent"] = "ephemeral";
})(EventKind || (exports.EventKind = EventKind = {}));
//# sourceMappingURL=EventKind.js.map