"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerLevelsEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
function defaultNum(val, def) {
    if (!val && val !== 0)
        return def;
    return val;
}
/**
 * Represents an m.room.power_levels state event
 * @category Matrix events
 */
class PowerLevelsEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The power level required to ban users.
     */
    get banLevel() {
        return defaultNum(this.content.ban, 50);
    }
    /**
     * The power level required to invite users.
     */
    get inviteLevel() {
        return defaultNum(this.content.invite, 50);
    }
    /**
     * The power level required to kick users.
     */
    get kickLevel() {
        return defaultNum(this.content.kick, 50);
    }
    /**
     * The power level required to redact messages sent by other users.
     */
    get redactLevel() {
        return defaultNum(this.content.redact, 50);
    }
    /**
     * The power level required to send "@room" notifications.
     */
    get notifyWholeRoomLevel() {
        if (!this.content.notifications)
            return 50;
        return defaultNum(this.content.notifications.room, 50);
    }
    /**
     * The default power level for users.
     */
    get defaultUserLevel() {
        return defaultNum(this.content.users_default, 0);
    }
    /**
     * The default power level required to send state events.
     */
    get defaultStateEventLevel() {
        return defaultNum(this.content.state_default, 50);
    }
    /**
     * The default power level required to send room events.
     */
    get defaultEventLevel() {
        return defaultNum(this.content.events_default, 50);
    }
}
exports.PowerLevelsEvent = PowerLevelsEvent;
//# sourceMappingURL=PowerLevelsEvent.js.map