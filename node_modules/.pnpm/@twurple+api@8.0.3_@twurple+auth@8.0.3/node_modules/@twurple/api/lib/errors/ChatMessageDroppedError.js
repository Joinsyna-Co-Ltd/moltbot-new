import { CustomError } from '@twurple/common';
/**
 * Thrown when a chat message is dropped and not delivered to the target channel.
 */
export class ChatMessageDroppedError extends CustomError {
    _code;
    constructor(broadcasterId, message, code) {
        super(`Chat message to channel ${broadcasterId} dropped: ${message ?? 'unknown reason'}`);
        this._code = code;
    }
    get code() {
        return this._code;
    }
}
