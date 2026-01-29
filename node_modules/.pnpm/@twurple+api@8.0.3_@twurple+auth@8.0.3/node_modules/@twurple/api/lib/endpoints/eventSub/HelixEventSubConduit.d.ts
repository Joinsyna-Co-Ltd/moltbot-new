import { DataObject } from '@twurple/common';
import type { HelixPaginatedResponse } from '@twurple/api-call';
import type { HelixEventSubConduitData } from '../../interfaces/endpoints/eventSub.external.js';
import type { HelixEventSubConduitShard } from './HelixEventSubConduitShard.js';
/**
 * Represents an EventSub conduit.
 */
export declare class HelixEventSubConduit extends DataObject<HelixEventSubConduitData> {
    /**
     * The ID of the conduit.
     */
    get id(): string;
    /**
     * The shard count of the conduit.
     */
    get shardCount(): number;
    /**
     * Update the conduit.
     *
     * @param shardCount The new shard count.
     */
    update(shardCount: number): Promise<HelixEventSubConduit>;
    /**
     * Delete the conduit.
     */
    delete(): Promise<void>;
    /**
     * Get the conduit shards.
     */
    getShards(): Promise<HelixPaginatedResponse<HelixEventSubConduitShard>>;
}
//# sourceMappingURL=HelixEventSubConduit.d.ts.map