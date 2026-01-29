import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Represents an EventSub conduit.
 */
let HelixEventSubConduit = class HelixEventSubConduit extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the conduit.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The shard count of the conduit.
     */
    get shardCount() {
        return this[rawDataSymbol].shard_count;
    }
    /**
     * Update the conduit.
     *
     * @param shardCount The new shard count.
     */
    async update(shardCount) {
        return await this._client.eventSub.updateConduit(this[rawDataSymbol].id, shardCount);
    }
    /**
     * Delete the conduit.
     */
    async delete() {
        await this._client.eventSub.deleteConduit(this[rawDataSymbol].id);
    }
    /**
     * Get the conduit shards.
     */
    async getShards() {
        return await this._client.eventSub.getConduitShards(this[rawDataSymbol].id);
    }
};
__decorate([
    Enumerable(false)
], HelixEventSubConduit.prototype, "_client", void 0);
HelixEventSubConduit = __decorate([
    rtfm('api', 'HelixEventSubConduit')
], HelixEventSubConduit);
export { HelixEventSubConduit };
