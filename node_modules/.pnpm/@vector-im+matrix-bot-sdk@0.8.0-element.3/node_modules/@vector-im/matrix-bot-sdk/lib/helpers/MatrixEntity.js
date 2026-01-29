"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomAlias = exports.UserID = exports.MatrixEntity = void 0;
/**
 * Represents a Matrix entity
 * @category Utilities
 */
class MatrixEntity {
    fullId;
    entityLocalpart;
    entityDomain;
    /**
     * Creates a new Matrix entity
     * @param {string} fullId The full ID of the entity
     */
    constructor(fullId) {
        this.fullId = fullId;
        if (!fullId)
            throw new Error("No entity ID provided");
        if (fullId.length < 2)
            throw new Error("ID too short");
        const parts = fullId.split(/:/g);
        this.entityLocalpart = parts[0].substring(1);
        this.entityDomain = parts.splice(1).join(':');
    }
    /**
     * The localpart for the entity
     */
    get localpart() {
        return this.entityLocalpart;
    }
    /**
     * The domain for the entity
     */
    get domain() {
        return this.entityDomain;
    }
    // override
    toString() {
        return this.fullId;
    }
}
exports.MatrixEntity = MatrixEntity;
/**
 * Represents a Matrix user ID
 * @category Utilities
 */
class UserID extends MatrixEntity {
    constructor(userId) {
        super(userId);
        if (!userId.startsWith("@")) {
            throw new Error("Not a valid user ID");
        }
    }
}
exports.UserID = UserID;
/**
 * Represents a Matrix room alias
 * @category Utilities
 */
class RoomAlias extends MatrixEntity {
    constructor(alias) {
        super(alias);
        if (!alias.startsWith("#")) {
            throw new Error("Not a valid room alias");
        }
    }
}
exports.RoomAlias = RoomAlias;
//# sourceMappingURL=MatrixEntity.js.map