"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalAliasEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.canonical_alias state event
 * @category Matrix events
 */
class CanonicalAliasEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The alias the room is considering canonical
     */
    get aliases() {
        return this.content.alias;
    }
}
exports.CanonicalAliasEvent = CanonicalAliasEvent;
//# sourceMappingURL=CanonicalAliasEvent.js.map