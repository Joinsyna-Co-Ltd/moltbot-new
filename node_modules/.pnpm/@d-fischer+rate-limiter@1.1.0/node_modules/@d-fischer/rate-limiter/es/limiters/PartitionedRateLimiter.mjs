import { ResponseBasedRateLimiter } from "./ResponseBasedRateLimiter.mjs";
export class PartitionedRateLimiter {
    constructor(options) {
        this._children = new Map();
        this._paused = false;
        this._partitionKeyCallback = options.getPartitionKey;
        this._createChildCallback = options.createChild;
    }
    async request(req, options) {
        const partitionKey = this._partitionKeyCallback(req);
        const partitionChild = this._getChild(partitionKey);
        return await partitionChild.request(req, options);
    }
    clear() {
        for (const child of this._children.values()) {
            child.clear();
        }
    }
    pause() {
        this._paused = true;
        for (const child of this._children.values()) {
            child.pause();
        }
    }
    resume() {
        this._paused = false;
        for (const child of this._children.values()) {
            child.resume();
        }
    }
    getChildStats(partitionKey) {
        if (!this._children.has(partitionKey)) {
            return null;
        }
        const child = this._children.get(partitionKey);
        if (!(child instanceof ResponseBasedRateLimiter)) {
            return null;
        }
        return child.stats;
    }
    _getChild(partitionKey) {
        if (this._children.has(partitionKey)) {
            return this._children.get(partitionKey);
        }
        const result = this._createChildCallback(partitionKey);
        if (this._paused) {
            result.pause();
        }
        this._children.set(partitionKey, result);
        return result;
    }
}
