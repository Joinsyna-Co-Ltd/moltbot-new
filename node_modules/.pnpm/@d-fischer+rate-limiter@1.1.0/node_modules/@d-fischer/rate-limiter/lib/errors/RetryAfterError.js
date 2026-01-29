"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryAfterError = void 0;
const CustomError_1 = require("./CustomError");
class RetryAfterError extends CustomError_1.CustomError {
    constructor(after) {
        super(`Need to retry after ${after} ms`);
        this._retryAt = Date.now() + after;
    }
    get retryAt() {
        return this._retryAt;
    }
}
exports.RetryAfterError = RetryAfterError;
