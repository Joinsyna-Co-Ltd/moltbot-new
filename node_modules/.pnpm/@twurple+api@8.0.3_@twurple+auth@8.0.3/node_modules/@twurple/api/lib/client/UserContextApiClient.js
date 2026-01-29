import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { BaseApiClient } from './BaseApiClient.js';
/** @private */
let UserContextApiClient = class UserContextApiClient extends BaseApiClient {
    _userId;
    /** @internal */
    constructor(config, logger, rateLimiter, _userId) {
        super(config, logger, rateLimiter);
        this._userId = _userId;
    }
    /** @internal */
    _getUserIdFromRequestContext() {
        return this._userId;
    }
};
UserContextApiClient = __decorate([
    rtfm('api', 'ApiClient')
], UserContextApiClient);
export { UserContextApiClient };
