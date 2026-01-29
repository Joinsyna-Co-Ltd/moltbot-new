"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullRateLimiter = void 0;
class NullRateLimiter {
    constructor(_callback) {
        this._callback = _callback;
    }
    async request(req) {
        return await this._callback(req);
    }
    clear() {
        // noop
    }
    pause() {
        // noop
    }
    resume() {
        // noop
    }
}
exports.NullRateLimiter = NullRateLimiter;
