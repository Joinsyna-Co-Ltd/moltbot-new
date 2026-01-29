"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixProfile = void 0;
const __1 = require("..");
/**
 * Represents a user's profile, possibly in a room.
 * @category Models
 */
class MatrixProfile {
    userId;
    profile;
    /**
     * Creates a new profile representation for a user.
     * @param {string} userId The user ID the profile is for.
     * @param {MatrixProfile} profile The profile itself.
     */
    constructor(userId, profile) {
        this.userId = userId;
        this.profile = profile;
    }
    /**
     * The display name for the user. This will always return a value, though it
     * may be based upon their user ID if no explicit display name is set.
     */
    get displayName() {
        if (!this.profile?.displayname)
            return new __1.UserID(this.userId).localpart;
        return this.profile.displayname;
    }
    /**
     * The avatar URL for the user. If the user does not have an avatar, this will
     * be null.
     */
    get avatarUrl() {
        return this.profile?.avatar_url || null; // enforce null over boolean semantics
    }
    /**
     * A mention pill for this user.
     */
    get mention() {
        return __1.MentionPill.withDisplayName(this.userId, this.displayName);
    }
}
exports.MatrixProfile = MatrixProfile;
//# sourceMappingURL=MatrixProfile.js.map