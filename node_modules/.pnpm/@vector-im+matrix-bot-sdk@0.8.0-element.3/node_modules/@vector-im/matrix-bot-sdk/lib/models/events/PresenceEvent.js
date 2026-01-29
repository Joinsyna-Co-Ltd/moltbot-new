"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceEvent = void 0;
const Event_1 = require("./Event");
/**
 * Wraps a m.presence ephemeral event in Matrix
 * @category Matrix events
 */
class PresenceEvent extends Event_1.MatrixEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The current presence state for the user.
     */
    get presence() {
        return this.content.presence;
    }
}
exports.PresenceEvent = PresenceEvent;
//# sourceMappingURL=PresenceEvent.js.map