import { CustomError } from "./CustomError.mjs";
export class RetryAfterError extends CustomError {
    constructor(after) {
        super(`Need to retry after ${after} ms`);
        this._retryAt = Date.now() + after;
    }
    get retryAt() {
        return this._retryAt;
    }
}
