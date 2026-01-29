import { TimeBasedRateLimiter } from "./TimeBasedRateLimiter.mjs";
export class TimedPassthruRateLimiter extends TimeBasedRateLimiter {
    constructor(child, config) {
        super({
            ...config,
            async doRequest(req, options) {
                return await child.request(req, options);
            }
        });
    }
}
