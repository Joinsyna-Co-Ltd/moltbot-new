"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixEvent = void 0;
/**
 * A Matrix event.
 * @category Matrix events
 */
class MatrixEvent {
    event;
    constructor(event) {
        this.event = event;
    }
    /**
     * The user ID who sent this event.
     */
    get sender() {
        return this.event['sender'];
    }
    /**
     * The type of this event.
     */
    get type() {
        return this.event['type'];
    }
    /**
     * The content for this event. May have no properties.
     */
    get content() {
        return this.event['content'] || {};
    }
    /**
     * Gets the raw event that this MatrixEvent is using.
     * Note that there's no guarantees on formats here - it is the exact
     * same input to the constructor.
     */
    get raw() {
        return this.event;
    }
}
exports.MatrixEvent = MatrixEvent;
//# sourceMappingURL=Event.js.map