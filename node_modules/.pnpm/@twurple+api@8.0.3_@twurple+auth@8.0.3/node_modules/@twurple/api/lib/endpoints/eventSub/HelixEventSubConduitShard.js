import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Represents an EventSub conduit shard.
 */
let HelixEventSubConduitShard = class HelixEventSubConduitShard extends DataObject {
    /**
     * The ID of the shard.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The status of the shard.
     */
    get status() {
        return this[rawDataSymbol].status;
    }
    /**
     * The transport method of the shard.
     */
    get transportMethod() {
        return this[rawDataSymbol].transport.method;
    }
};
HelixEventSubConduitShard = __decorate([
    rtfm('api', 'HelixEventSubConduitShard')
], HelixEventSubConduitShard);
export { HelixEventSubConduitShard };
