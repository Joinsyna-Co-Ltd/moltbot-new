export class NullRateLimiter {
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
