"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceChildEvent = void 0;
const RoomEvent_1 = require("./RoomEvent");
/**
 * Represents an m.space.child state event
 * @category Matrix events
 */
class SpaceChildEvent extends RoomEvent_1.StateEvent {
    constructor(event) {
        super(event);
    }
    /**
     * The room ID of the space or room this child represents.
     */
    get entityRoomId() {
        return this.stateKey;
    }
    /**
     * Whether or not this child is "active" or valid. Inactive children are
     * not considered part of a space.
     */
    get isActiveChild() {
        return !!this.viaServers?.length;
    }
    /**
     * The servers the client should provide to the homeserver when trying to
     * join the entity (room). May be empty or falsey to denote the child is
     * inactive.
     */
    get viaServers() {
        return this.content.via;
    }
    /**
     * An optional short string to differentiate the rendering order of entities.
     * @see validateSpaceOrderString
     */
    get order() {
        return this.content.order;
    }
    /**
     * Whether or not the child is a suggested entity for users to join.
     */
    get suggested() {
        return this.content.suggested ?? false;
    }
}
exports.SpaceChildEvent = SpaceChildEvent;
//# sourceMappingURL=SpaceChildEvent.js.map