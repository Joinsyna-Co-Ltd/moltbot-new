import { createLogger } from '@d-fischer/logger';
import { RateLimitReachedError } from "../errors/RateLimitReachedError.mjs";
import { RateLimiterDestroyedError } from "../errors/RateLimiterDestroyedError.mjs";
export class TimeBasedRateLimiter {
    constructor({ logger, bucketSize, timeFrame, doRequest }) {
        this._queue = [];
        this._usedFromBucket = 0;
        this._counterTimers = new Set();
        this._paused = false;
        this._destroyed = false;
        this._logger = createLogger({ name: 'rate-limiter', emoji: true, ...logger });
        this._bucketSize = bucketSize;
        this._timeFrame = timeFrame;
        this._callback = doRequest;
    }
    async request(req, options) {
        return await new Promise((resolve, reject) => {
            var _a;
            if (this._destroyed) {
                reject(new RateLimiterDestroyedError('Rate limiter was destroyed'));
                return;
            }
            const reqSpec = {
                req,
                resolve,
                reject,
                limitReachedBehavior: (_a = options === null || options === void 0 ? void 0 : options.limitReachedBehavior) !== null && _a !== void 0 ? _a : 'enqueue'
            };
            if (this._usedFromBucket >= this._bucketSize || this._paused) {
                switch (reqSpec.limitReachedBehavior) {
                    case 'enqueue': {
                        this._queue.push(reqSpec);
                        if (this._usedFromBucket + this._queue.length >= this._bucketSize) {
                            this._logger.warn(`Rate limit of ${this._bucketSize} was reached, waiting for ${this._paused ? 'the limiter to be unpaused' : 'a free bucket entry'}; queue size is ${this._queue.length}`);
                        }
                        else {
                            this._logger.info(`Enqueueing request because the rate limiter is paused; queue size is ${this._queue.length}`);
                        }
                        break;
                    }
                    case 'null': {
                        reqSpec.resolve(null);
                        this._logger.warn(`Rate limit of ${this._bucketSize} was reached, dropping request and returning null`);
                        if (this._paused) {
                            this._logger.info('Returning null for request because the rate limiter is paused');
                        }
                        else {
                            this._logger.warn(`Rate limit of ${this._bucketSize} was reached, dropping request and returning null`);
                        }
                        break;
                    }
                    case 'throw': {
                        reqSpec.reject(new RateLimitReachedError(`Request dropped because ${this._paused ? 'the rate limiter is paused' : 'the rate limit was reached'}`));
                        break;
                    }
                    default: {
                        throw new Error('this should never happen');
                    }
                }
            }
            else {
                void this._runRequest(reqSpec);
            }
        });
    }
    clear() {
        this._queue = [];
    }
    pause() {
        this._paused = true;
    }
    resume() {
        this._paused = false;
        this._runNextRequest();
    }
    destroy() {
        this._paused = false;
        this._destroyed = true;
        this._counterTimers.forEach(timer => {
            clearTimeout(timer);
        });
        for (const req of this._queue) {
            req.reject(new RateLimiterDestroyedError('Rate limiter was destroyed'));
        }
        this._queue = [];
    }
    async _runRequest(reqSpec) {
        this._logger.debug(`doing a request, new queue length is ${this._queue.length}`);
        this._usedFromBucket += 1;
        const { req, resolve, reject } = reqSpec;
        try {
            resolve(await this._callback(req));
        }
        catch (e) {
            reject(e);
        }
        finally {
            const counterTimer = setTimeout(() => {
                this._counterTimers.delete(counterTimer);
                this._usedFromBucket -= 1;
                if (this._queue.length && this._usedFromBucket < this._bucketSize) {
                    this._runNextRequest();
                }
            }, this._timeFrame);
            this._counterTimers.add(counterTimer);
        }
    }
    _runNextRequest() {
        if (this._paused) {
            return;
        }
        const reqSpec = this._queue.shift();
        if (reqSpec) {
            void this._runRequest(reqSpec);
        }
    }
}
