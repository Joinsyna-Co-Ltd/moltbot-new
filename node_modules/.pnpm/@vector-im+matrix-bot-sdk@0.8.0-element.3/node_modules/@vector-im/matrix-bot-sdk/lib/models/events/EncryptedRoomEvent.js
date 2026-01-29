"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptedRoomEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.room.encrypted room event
 * @category Matrix events
 */
class EncryptedRoomEvent extends RoomEvent_1.RoomEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The encryption algorithm used on the event. Should match the m.room.encryption
     * state config.
     */
    get algorithm() {
        return this.content.algorithm;
    }
    /**
     * The Megolm encrypted payload information.
     */
    get megolmProperties() {
        return this.content;
    }
}
exports.EncryptedRoomEvent = EncryptedRoomEvent;
//# sourceMappingURL=EncryptedRoomEvent.js.map