"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
const MatrixEntity_1 = require("../helpers/MatrixEntity");
const simple_validation_1 = require("../simple-validation");
const SpaceChildEvent_1 = require("./events/SpaceChildEvent");
/**
 * An instance representing a Matrix Space. A space is tied to a room.
 * @category Models
 */
class Space {
    roomId;
    client;
    constructor(roomId, client) {
        this.roomId = roomId;
        this.client = client;
    }
    /**
     * Creates a new child space under this space.
     * @param {SpaceCreateOptions} opts The options for the new space.
     * @returns {Promise<Space>} Resolves to the created space.
     */
    async createChildSpace(opts) {
        const space = await this.client.createSpace(opts);
        await this.addChildSpace(space, opts);
        return space;
    }
    /**
     * Adds a child space to the space. Must be joined to both spaces.
     * @param {Space} space The space to add.
     * @param {SpaceChildEntityOptions} childOpts Related options for the child's representation.
     * @returns {Promise<Space>} Resolves when complete.
     */
    async addChildSpace(space, childOpts = {}) {
        await this.addChildRoom(space.roomId, childOpts);
    }
    /**
     * Removes a child space from the space. Must be joined to the current space (not needed for child space).
     * @param {Space} space The space to remove.
     * @returns {Promise<void>} Resolves when complete.
     */
    async removeChildSpace(space) {
        await this.removeChildRoom(space.roomId);
    }
    /**
     * Adds a child room to the space. Must be joined to both the room and the space.
     * @param {string} roomId The room ID to add.
     * @param {SpaceChildEntityOptions} childOpts Additional options for the child space.
     * @returns {Promise<void>} Resolves when complete.
     */
    async addChildRoom(roomId, childOpts = {}) {
        const via = childOpts.via ?? [new MatrixEntity_1.UserID(await this.client.getUserId()).domain];
        const childContent = { via };
        if (childOpts.suggested)
            childContent.suggested = childOpts.suggested;
        if (childOpts.order) {
            (0, simple_validation_1.validateSpaceOrderString)(childOpts.order);
            childContent.order = childOpts.order;
        }
        await this.client.sendStateEvent(this.roomId, "m.space.child", roomId, childContent);
    }
    /**
     * Removes a child room from the space. Must be joined to the current space (not needed for child room).
     * @param {string} roomId The room ID to remove.
     * @returns {Promise<void>} Resolves when complete.
     */
    async removeChildRoom(roomId) {
        await this.client.sendStateEvent(this.roomId, "m.space.child", roomId, {});
    }
    /**
     * Gets all the child rooms on the space. These may be spaces or other rooms.
     * @returns {Promise<SpaceEntityMap>} Resolves to a map of children for this space.
     */
    async getChildEntities() {
        const roomState = await this.client.getRoomState(this.roomId);
        const mapping = {};
        roomState
            .filter(s => s.type === "m.space.child")
            .filter(s => s.content?.via)
            .forEach(s => mapping[s.state_key] = new SpaceChildEvent_1.SpaceChildEvent(s));
        return mapping;
    }
    /**
     * Invite a user to the current space.
     * @param {string} userId The user ID to invite.
     * @returns {Promise<void>} Resolves when completed.
     */
    async inviteUser(userId) {
        return this.client.inviteUser(userId, this.roomId);
    }
}
exports.Space = Space;
//# sourceMappingURL=Spaces.js.map