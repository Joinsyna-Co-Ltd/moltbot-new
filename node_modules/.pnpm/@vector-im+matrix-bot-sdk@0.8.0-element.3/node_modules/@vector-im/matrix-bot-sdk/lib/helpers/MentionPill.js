"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentionPill = void 0;
const Permalinks_1 = require("./Permalinks");
const __1 = require("..");
/**
 * Represents a system for generating a mention pill for an entity.
 * @category Utilities
 */
class MentionPill {
    entityPermalink;
    displayName;
    constructor(entityPermalink, displayName) {
        this.entityPermalink = entityPermalink;
        this.displayName = displayName;
    }
    /**
     * The HTML component of the mention.
     */
    get html() {
        return `<a href="${this.entityPermalink}">${this.displayName}</a>`;
    }
    /**
     * The plain text component of the mention.
     */
    get text() {
        return this.displayName;
    }
    /**
     * Creates a new mention for a user in an optional room.
     * @param {string} userId The user ID the mention is for.
     * @param {String} inRoomId Optional room ID the user is being mentioned in, for the aesthetics of the mention.
     * @param {MatrixClient} client Optional client for creating a more pleasing mention.
     * @returns {Promise<MentionPill>} Resolves to the user's mention.
     */
    static async forUser(userId, inRoomId = null, client = null) {
        const permalink = Permalinks_1.Permalinks.forUser(userId);
        let displayName = userId;
        try {
            if (client) {
                let profile = null;
                if (inRoomId) {
                    profile = await client.getRoomStateEventContent(inRoomId, "m.room.member", userId);
                }
                if (!profile) {
                    profile = await client.getUserProfile(userId);
                }
                if (profile['displayname']) {
                    displayName = profile['displayname'];
                }
            }
        }
        catch (e) {
            __1.LogService.warn("MentionPill", "Error getting profile", (0, __1.extractRequestError)(e));
        }
        return new MentionPill(permalink, displayName);
    }
    /**
     * Creates a new mention for a room (not @room, but the room itself to be linked).
     * @param {string} roomIdOrAlias The room ID or alias to mention.
     * @param {MatrixClient} client Optional client for creating a more pleasing mention.
     * @returns {Promise<MentionPill>} Resolves to the room's mention.
     */
    static async forRoom(roomIdOrAlias, client = null) {
        let permalink = Permalinks_1.Permalinks.forRoom(roomIdOrAlias);
        let displayProp = roomIdOrAlias;
        try {
            if (client) {
                const roomId = await client.resolveRoom(roomIdOrAlias);
                const canonicalAlias = await client.getRoomStateEventContent(roomId, "m.room.canonical_alias", "");
                if (canonicalAlias?.alias) {
                    displayProp = canonicalAlias.alias;
                    permalink = Permalinks_1.Permalinks.forRoom(displayProp);
                }
            }
        }
        catch (e) {
            __1.LogService.warn("MentionPill", "Error getting room information", (0, __1.extractRequestError)(e));
        }
        return new MentionPill(permalink, displayProp);
    }
    /**
     * Creates a mention from static information.
     * @param {string} userId The user ID the mention is for.
     * @param {string} displayName The user's display name.
     * @returns {MentionPill} The mention for the user.
     */
    static withDisplayName(userId, displayName) {
        return new MentionPill(Permalinks_1.Permalinks.forUser(userId), displayName || userId);
    }
}
exports.MentionPill = MentionPill;
//# sourceMappingURL=MentionPill.js.map