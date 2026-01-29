"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageError = void 0;
class MessageError extends Error {
    constructor(msg) {
        var _a;
        super(`Received error from IRC server: ${(_a = msg.rawLine) !== null && _a !== void 0 ? _a : '[message internally built]'}`);
        this.ircMessage = msg;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    get name() {
        return this.constructor.name;
    }
}
exports.MessageError = MessageError;
