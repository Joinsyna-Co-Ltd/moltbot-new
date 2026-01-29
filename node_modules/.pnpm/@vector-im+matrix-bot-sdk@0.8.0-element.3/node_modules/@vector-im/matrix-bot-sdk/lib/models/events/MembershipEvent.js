"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
const InvalidEventError_1 = require("./InvalidEventError");
/**
 * Represents an m.room.member state event
 * @category Matrix events
 */
class MembershipEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * True if the membership event targets the sender. False otherwise.
     *
     * This will typically by false for kicks and bans.
     */
    get ownMembership() {
        return this.membershipFor === this.sender;
    }
    /**
     * The reason why a user may have sent this membership.
     */
    get reason() {
        return this.content.reason;
    }
    /**
     * The user ID the membership affects.
     */
    get membershipFor() {
        return this.stateKey;
    }
    /**
     * The user's membership.
     */
    get membership() {
        const membership = this.content.membership;
        if (!membership)
            throw new InvalidEventError_1.InvalidEventError("no membership field in content");
        return membership;
    }
    /**
     * The user's effective membership.
     */
    get effectiveMembership() {
        if (this.membership === "join")
            return "join";
        if (this.membership === "invite")
            return "invite";
        return "leave";
    }
}
exports.MembershipEvent = MembershipEvent;
//# sourceMappingURL=MembershipEvent.js.map