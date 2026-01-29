"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasesEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.aliases state event
 * @category Matrix events
 */
class AliasesEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The domain the aliases belong to.
     */
    get forDomain() {
        return this.stateKey;
    }
    /**
     * The aliases the domain has published to the room.
     */
    get aliases() {
        return this.content.aliases || [];
    }
}
exports.AliasesEvent = AliasesEvent;
//# sourceMappingURL=AliasesEvent.js.map