import { createCacheKey } from "../utils/createCacheKey.mjs";
const cacheSymbol = Symbol('cache');
export function Cacheable(cls) {
    var _a, _b;
    return _b = class extends cls {
            constructor() {
                super(...arguments);
                this[_a] = new Map();
            }
            getFromCache(cacheKey) {
                this._cleanCache();
                if (this[cacheSymbol].has(cacheKey)) {
                    const entry = this[cacheSymbol].get(cacheKey);
                    if (entry) {
                        return entry.value;
                    }
                }
                return undefined;
            }
            setCache(cacheKey, value, timeInSeconds) {
                this[cacheSymbol].set(cacheKey, {
                    value,
                    expires: Date.now() + timeInSeconds * 1000
                });
            }
            removeFromCache(cacheKey, prefix) {
                const internalCacheKey = this._getInternalCacheKey(cacheKey, prefix);
                if (prefix) {
                    this[cacheSymbol].forEach((val, key) => {
                        if (key.startsWith(internalCacheKey)) {
                            this[cacheSymbol].delete(key);
                        }
                    });
                }
                else {
                    this[cacheSymbol].delete(internalCacheKey);
                }
            }
            _cleanCache() {
                const now = Date.now();
                this[cacheSymbol].forEach((val, key) => {
                    if (val.expires < now) {
                        this[cacheSymbol].delete(key);
                    }
                });
            }
            _getInternalCacheKey(cacheKey, prefix) {
                if (typeof cacheKey === 'string') {
                    let internalCacheKey = cacheKey;
                    if (!internalCacheKey.endsWith('/')) {
                        internalCacheKey += '/';
                    }
                    return internalCacheKey;
                }
                else {
                    const propName = cacheKey.shift();
                    return createCacheKey(propName, cacheKey, prefix);
                }
            }
        },
        _a = cacheSymbol,
        _b;
}
