"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimedPassthruRateLimiter = void 0;
const TimeBasedRateLimiter_1 = require("./TimeBasedRateLimiter");
class TimedPassthruRateLimiter extends TimeBasedRateLimiter_1.TimeBasedRateLimiter {
    constructor(child, config) {
        super({
            ...config,
            async doRequest(req, options) {
                return await child.request(req, options);
            }
        });
    }
}
exports.TimedPassthruRateLimiter = TimedPassthruRateLimiter;
