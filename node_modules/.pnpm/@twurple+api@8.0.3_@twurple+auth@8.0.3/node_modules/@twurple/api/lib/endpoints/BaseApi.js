import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
/** @private */
export class BaseApi {
    /** @internal */ _client;
    /** @internal */
    constructor(client) {
        this._client = client;
    }
    /** @internal */
    _getUserContextIdWithDefault(userId) {
        return this._client._getUserIdFromRequestContext(userId) ?? userId;
    }
}
__decorate([
    Enumerable(false)
], BaseApi.prototype, "_client", void 0);
