"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRulesEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.join_rules state event
 * @category Matrix events
 */
class JoinRulesEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The join rule for the room.
     */
    get rule() {
        return this.content.join_rule;
    }
}
exports.JoinRulesEvent = JoinRulesEvent;
//# sourceMappingURL=JoinRulesEvent.js.map