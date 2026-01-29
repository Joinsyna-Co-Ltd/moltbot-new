import { createLogger } from '@d-fischer/logger';
import { RateLimitReachedError } from "../errors/RateLimitReachedError.mjs";
import { RateLimiterDestroyedError } from "../errors/RateLimiterDestroyedError.mjs";
export class PartitionedTimeBasedRateLimiter {
    constructor({ logger, bucketSize, timeFrame, doRequest, getPartitionKey }) {
        this._partitionedQueue = new Map();
        this._usedFromBucket = new Map();
        this._counterTimers = new Set();
        this._paused = false;
        this._destroyed = false;
        this._logger = createLogger({ name: 'rate-limiter', emoji: true, ...logger });
        this._bucketSize = bucketSize;
        this._timeFrame = timeFrame;
        this._callback = doRequest;
        this._partitionKeyCallback = getPartitionKey;
    }
    async request(req, options) {
        return await new Promise((resolve, reject) => {
            var _a, _b;
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
            const partitionKey = this._partitionKeyCallback(req);
            const usedFromBucket = (_b = this._usedFromBucket.get(partitionKey)) !== null && _b !== void 0 ? _b : 0;
            if (usedFromBucket >= this._bucketSize || this._paused) {
                switch (reqSpec.limitReachedBehavior) {
                    case 'enqueue': {
                        const queue = this._getPartitionedQueue(partitionKey);
                        queue.push(reqSpec);
                        if (usedFromBucket + queue.length >= this._bucketSize) {
                            this._logger.warn(`Rate limit of ${this._bucketSize} for ${partitionKey ? `partition ${partitionKey}` : 'default partition'} was reached, waiting for ${this._paused ? 'the limiter to be unpaused' : 'a free bucket entry'}; queue size is ${queue.length}`);
                        }
                        else {
                            this._logger.info(`Enqueueing request for ${partitionKey ? `partition ${partitionKey}` : 'default partition'} because the rate limiter is paused; queue size is ${queue.length}`);
                        }
                        break;
                    }
                    case 'null': {
                        reqSpec.resolve(null);
                        if (this._paused) {
                            this._logger.info(`Returning null for request for ${partitionKey ? `partition ${partitionKey}` : 'default partition'} because the rate limiter is paused`);
                        }
                        else {
                            this._logger.warn(`Rate limit of ${this._bucketSize} for ${partitionKey ? `partition ${partitionKey}` : 'default partition'} was reached, dropping request and returning null`);
                        }
                        break;
                    }
                    case 'throw': {
                        reqSpec.reject(new RateLimitReachedError(`Request dropped because ${this._paused
                            ? 'the rate limiter is paused'
                            : `the rate limit for ${partitionKey ? `partition ${partitionKey}` : 'default partition'} was reached`}`));
                        break;
                    }
                    default: {
                        throw new Error('this should never happen');
                    }
                }
            }
            else {
                void this._runRequest(reqSpec, partitionKey);
            }
        });
    }
    clear() {
        this._partitionedQueue.clear();
    }
    pause() {
        this._paused = true;
    }
    resume() {
        this._paused = false;
        for (const partitionKey of this._partitionedQueue.keys()) {
            this._runNextRequest(partitionKey);
        }
    }
    destroy() {
        this._paused = false;
        this._destroyed = true;
        this._counterTimers.forEach(timer => {
            clearTimeout(timer);
        });
        for (const queue of this._partitionedQueue.values()) {
            for (const req of queue) {
                req.reject(new RateLimiterDestroyedError('Rate limiter was destroyed'));
            }
        }
        this._partitionedQueue.clear();
    }
    _getPartitionedQueue(partitionKey) {
        if (this._partitionedQueue.has(partitionKey)) {
            return this._partitionedQueue.get(partitionKey);
        }
        const newQueue = [];
        this._partitionedQueue.set(partitionKey, newQueue);
        return newQueue;
    }
    async _runRequest(reqSpec, partitionKey) {
        var _a;
        const queue = this._getPartitionedQueue(partitionKey);
        this._logger.debug(`doing a request for ${partitionKey ? `partition ${partitionKey}` : 'default partition'}, new queue length is ${queue.length}`);
        this._usedFromBucket.set(partitionKey, ((_a = this._usedFromBucket.get(partitionKey)) !== null && _a !== void 0 ? _a : 0) + 1);
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
                const newUsed = this._usedFromBucket.get(partitionKey) - 1;
                this._usedFromBucket.set(partitionKey, newUsed);
                if (queue.length && newUsed < this._bucketSize) {
                    this._runNextRequest(partitionKey);
                }
            }, this._timeFrame);
            this._counterTimers.add(counterTimer);
        }
    }
    _runNextRequest(partitionKey) {
        if (this._paused) {
            return;
        }
        const queue = this._getPartitionedQueue(partitionKey);
        const reqSpec = queue.shift();
        if (reqSpec) {
            void this._runRequest(reqSpec, partitionKey);
        }
    }
}
