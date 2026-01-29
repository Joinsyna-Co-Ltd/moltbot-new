"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionEvent = exports.RoomEncryptionAlgorithm = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * The kinds of room encryption algorithms allowed by the spec.
 * @category Models
 * @see EncryptionEvent
 */
var RoomEncryptionAlgorithm;
(function (RoomEncryptionAlgorithm) {
    RoomEncryptionAlgorithm["MegolmV1AesSha2"] = "m.megolm.v1.aes-sha2";
})(RoomEncryptionAlgorithm || (exports.RoomEncryptionAlgorithm = RoomEncryptionAlgorithm = {}));
/**
 * Represents an m.room.encryption state event
 * @category Matrix events
 */
class EncryptionEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The encryption algorithm for the room.
     */
    get algorithm() {
        return this.content.algorithm;
    }
    /**
     * How long a session should be used before changing it. Defaults to a week.
     */
    get rotationPeriodMs() {
        return this.content.rotation_period_ms ?? 604800000; // 1 week
    }
    /**
     * How many messages should be sent before a session changes. Defaults to 100.
     */
    get rotationPeriodMessages() {
        return this.content.rotation_period_msgs ?? 100;
    }
}
exports.EncryptionEvent = EncryptionEvent;
//# sourceMappingURL=EncryptionEvent.js.map