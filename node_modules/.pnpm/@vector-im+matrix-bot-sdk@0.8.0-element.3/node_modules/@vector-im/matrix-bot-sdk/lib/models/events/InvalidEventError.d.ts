/**
 * Thrown when an event is invalid.
 * @category Matrix events
 */
export declare class InvalidEventError extends Error {
    constructor(message?: string);
}
/**
 * Thrown when an event is redacted.
 * @category Matrix events
 */
export declare class EventRedactedError extends InvalidEventError {
    constructor(message?: string);
}
