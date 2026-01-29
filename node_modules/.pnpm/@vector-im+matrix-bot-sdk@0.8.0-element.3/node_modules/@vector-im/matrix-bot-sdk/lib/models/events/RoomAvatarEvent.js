"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomAvatarEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.avatar state event
 * @category Matrix events
 */
class RoomAvatarEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The URL for the avatar of the room.
     */
    get avatarUrl() {
        return this.content.url;
    }
}
exports.RoomAvatarEvent = RoomAvatarEvent;
//# sourceMappingURL=RoomAvatarEvent.js.map