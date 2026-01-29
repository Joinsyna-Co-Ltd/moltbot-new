/**
 * Represents a Matrix entity
 * @category Utilities
 */
export declare class MatrixEntity {
    private fullId;
    private entityLocalpart;
    private entityDomain;
    /**
     * Creates a new Matrix entity
     * @param {string} fullId The full ID of the entity
     */
    constructor(fullId: string);
    /**
     * The localpart for the entity
     */
    get localpart(): string;
    /**
     * The domain for the entity
     */
    get domain(): string;
    toString(): string;
}
/**
 * Represents a Matrix user ID
 * @category Utilities
 */
export declare class UserID extends MatrixEntity {
    constructor(userId: string);
}
/**
 * Represents a Matrix room alias
 * @category Utilities
 */
export declare class RoomAlias extends MatrixEntity {
    constructor(alias: string);
}
