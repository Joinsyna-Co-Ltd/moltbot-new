import { MatrixClient } from "../MatrixClient";
import { SpaceChildEvent } from "./events/SpaceChildEvent";
/**
 * Options to be specified when creating a Space.
 * @category Models
 */
export interface SpaceCreateOptions {
    /**
     * The name of the space.
     */
    name: string;
    /**
     * The topic/description for the space.
     */
    topic?: string;
    /**
     * An MXC URI for the space's avatar.
     */
    avatarUrl?: string;
    /**
     * Whether or not the space should be publicly joinable or not.
     */
    isPublic: boolean;
    /**
     * Optional localpart for the alias of the space.
     */
    localpart?: string;
    /**
     * User IDs to invite to the space upon creation.
     */
    invites?: string[];
}
/**
 * Options for displaying/handling a child room/space.
 * @category Models
 */
export interface SpaceChildEntityOptions {
    /**
     * Whether or not the entity is intended to be a suggested entity.
     */
    suggested?: boolean;
    /**
     * Servers to try and join through. When not provided, the SDK will try to
     * determine a set.
     */
    via?: string[];
    /**
     * A short string to differentiate the rendering order of entities.
     * @see validateSpaceOrderString
     */
    order?: string;
}
/**
 * Options for creating a new child space or room.
 * @category Models
 */
export type NewChildOpts = SpaceCreateOptions & SpaceChildEntityOptions;
/**
 * A mapping of room ID to space child information.
 * @category Models
 */
export interface SpaceEntityMap {
    [roomId: string]: SpaceChildEvent;
}
/**
 * An instance representing a Matrix Space. A space is tied to a room.
 * @category Models
 */
export declare class Space {
    readonly roomId: string;
    readonly client: MatrixClient;
    constructor(roomId: string, client: MatrixClient);
    /**
     * Creates a new child space under this space.
     * @param {SpaceCreateOptions} opts The options for the new space.
     * @returns {Promise<Space>} Resolves to the created space.
     */
    createChildSpace(opts: NewChildOpts): Promise<Space>;
    /**
     * Adds a child space to the space. Must be joined to both spaces.
     * @param {Space} space The space to add.
     * @param {SpaceChildEntityOptions} childOpts Related options for the child's representation.
     * @returns {Promise<Space>} Resolves when complete.
     */
    addChildSpace(space: Space, childOpts?: SpaceChildEntityOptions): Promise<void>;
    /**
     * Removes a child space from the space. Must be joined to the current space (not needed for child space).
     * @param {Space} space The space to remove.
     * @returns {Promise<void>} Resolves when complete.
     */
    removeChildSpace(space: Space): Promise<void>;
    /**
     * Adds a child room to the space. Must be joined to both the room and the space.
     * @param {string} roomId The room ID to add.
     * @param {SpaceChildEntityOptions} childOpts Additional options for the child space.
     * @returns {Promise<void>} Resolves when complete.
     */
    addChildRoom(roomId: string, childOpts?: SpaceChildEntityOptions): Promise<void>;
    /**
     * Removes a child room from the space. Must be joined to the current space (not needed for child room).
     * @param {string} roomId The room ID to remove.
     * @returns {Promise<void>} Resolves when complete.
     */
    removeChildRoom(roomId: string): Promise<void>;
    /**
     * Gets all the child rooms on the space. These may be spaces or other rooms.
     * @returns {Promise<SpaceEntityMap>} Resolves to a map of children for this space.
     */
    getChildEntities(): Promise<SpaceEntityMap>;
    /**
     * Invite a user to the current space.
     * @param {string} userId The user ID to invite.
     * @returns {Promise<void>} Resolves when completed.
     */
    inviteUser(userId: string): Promise<any>;
}
