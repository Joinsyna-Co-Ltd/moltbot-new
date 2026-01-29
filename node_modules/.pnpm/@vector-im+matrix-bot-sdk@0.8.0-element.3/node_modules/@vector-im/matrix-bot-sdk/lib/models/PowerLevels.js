"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerLevelAction = exports.PLManager = exports.ROOM_CREATOR_PL = exports.ROOM_ADMIN_PL = exports.ROOM_MODERATOR_PL = void 0;
const __1 = require("..");
const CREATOR_ROOM_VERSIONS = ["12", "org.matrix.hydra.11"];
// Effective defaults for power levels
// https://spec.matrix.org/v1.15/client-server-api/#mroompower_levels
exports.ROOM_MODERATOR_PL = 50;
exports.ROOM_ADMIN_PL = 100;
// MAX_INT + 1, so it always trumps any PL in canonical JSON.
exports.ROOM_CREATOR_PL = 2 ** 53;
const DEFAULT_PL = {
    ban: exports.ROOM_MODERATOR_PL,
    invite: 0,
    state_default: exports.ROOM_MODERATOR_PL,
    events_default: 0,
};
/**
 * Handles calculating the true power levels for a given room, taking into
 * account any specific room version features.
 */
class PLManager {
    createEvent;
    powerLevels;
    static createFromRoomState(roomState) {
        const createEvent = roomState.find((s) => s.type === "m.room.create" && s.state_key === "");
        if (!createEvent) {
            throw Error("Could not find create event for room, cannot handle");
        }
        // This is not required to exist.
        const plEvent = roomState.find((s) => s.type === "m.room.power_levels" && s.state_key === "");
        return new PLManager(createEvent, plEvent?.content);
    }
    creators;
    static areCreatorsPriviledged(roomVersion) {
        return CREATOR_ROOM_VERSIONS.includes(roomVersion);
    }
    get areCreatorsPriviledged() {
        return (!!this.createEvent.content.room_version &&
            CREATOR_ROOM_VERSIONS.includes(this.createEvent.content.room_version));
    }
    get getFirstCreator() {
        // Creator field is never used.
        return this.createEvent.sender;
    }
    get currentPL() {
        return {
            ...DEFAULT_PL,
            ...this.powerLevels,
        };
    }
    get defaultPL() {
        return this.powerLevels?.users_default ?? 0;
    }
    constructor(createEvent, powerLevels) {
        this.createEvent = createEvent;
        this.powerLevels = powerLevels;
        this.creators = new Set([new __1.UserID(this.getFirstCreator).toString()]);
        if (this.areCreatorsPriviledged &&
            "additional_creators" in createEvent.content) {
            for (const userId of createEvent.content.additional_creators ??
                []) {
                // The server MUST validate these to be valid userIDs.
                this.creators.add(new __1.UserID(userId).toString());
            }
        }
    }
    canAdjustUserPL(userId) {
        if (this.areCreatorsPriviledged) {
            return !this.creators.has(userId);
        }
        return true;
    }
    getUserPowerLevel(userId) {
        if (this.areCreatorsPriviledged && this.creators.has(userId)) {
            return exports.ROOM_CREATOR_PL;
        }
        return (this.powerLevels?.users?.[userId] ??
            this.powerLevels?.users_default ??
            0);
    }
}
exports.PLManager = PLManager;
/**
 * Actions that can be guarded by power levels.
 */
var PowerLevelAction;
(function (PowerLevelAction) {
    /**
     * Power level required to ban other users.
     */
    PowerLevelAction["Ban"] = "ban";
    /**
     * Power level required to kick other users.
     */
    PowerLevelAction["Kick"] = "kick";
    /**
     * Power level required to redact events sent by other users. Users can redact
     * their own messages regardless of this power level requirement, unless forbidden
     * by the `events` section of the power levels content.
     */
    PowerLevelAction["RedactEvents"] = "redact";
    /**
     * Power level required to invite other users.
     */
    PowerLevelAction["Invite"] = "invite";
    /**
     * Power level required to notify the whole room with "@room".
     */
    PowerLevelAction["NotifyRoom"] = "notifications.room";
})(PowerLevelAction || (exports.PowerLevelAction = PowerLevelAction = {}));
//# sourceMappingURL=PowerLevels.js.map