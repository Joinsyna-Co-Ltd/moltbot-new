import { DataObject } from '@twurple/common';
import { type HelixEventSubConduitShardData, type HelixEventSubSubscriptionStatus } from '../../interfaces/endpoints/eventSub.external.js';
/**
 * Represents an EventSub conduit shard.
 */
export declare class HelixEventSubConduitShard extends DataObject<HelixEventSubConduitShardData> {
    /**
     * The ID of the shard.
     */
    get id(): string;
    /**
     * The status of the shard.
     */
    get status(): HelixEventSubSubscriptionStatus;
    /**
     * The transport method of the shard.
     */
    get transportMethod(): string;
}
//# sourceMappingURL=HelixEventSubConduitShard.d.ts.map