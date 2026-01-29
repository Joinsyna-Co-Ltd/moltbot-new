"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRedactedError = exports.InvalidEventError = void 0;
/**
 * Thrown when an event is invalid.
 * @category Matrix events
 */
class InvalidEventError extends Error {
    constructor(message = null) {
        super(message);
    }
}
exports.InvalidEventError = InvalidEventError;
/**
 * Thrown when an event is redacted.
 * @category Matrix events
 */
class EventRedactedError extends InvalidEventError {
    constructor(message = null) {
        super(message);
    }
}
exports.EventRedactedError = EventRedactedError;
//# sourceMappingURL=InvalidEventError.js.map