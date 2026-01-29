"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presence = void 0;
/**
 * Presence information for a user.
 * @category Models
 */
class Presence {
    presence;
    constructor(presence) {
        this.presence = presence;
    }
    /**
     * The state for this presence update.
     */
    get state() {
        return this.presence.presence;
    }
    /**
     * The status message which accompanies this presence. May be falsey.
     */
    get statusMessage() {
        return this.presence.status_msg;
    }
    /**
     * How long ago in milliseconds this presence was changed. May be falsey.
     */
    get lastActiveAgo() {
        return this.presence.last_active_ago;
    }
    /**
     * Whether or not the user is currently active.
     */
    get currentlyActive() {
        return this.presence.currently_active;
    }
}
exports.Presence = Presence;
//# sourceMappingURL=Presence.js.map