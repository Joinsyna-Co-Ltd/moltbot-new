import { type RateLimiter, type RateLimiterRequestOptions } from '../RateLimiter';
import { type RateLimiterStats } from '../RateLimiterStats';
export interface PartitionedRateLimiterOptions<Req, Res> {
    getPartitionKey: (req: Req) => string | null;
    createChild: (partitionKey: string | null) => RateLimiter<Req, Res>;
}
export declare class PartitionedRateLimiter<Req, Res> implements RateLimiter<Req, Res> {
    private readonly _children;
    private readonly _partitionKeyCallback;
    private readonly _createChildCallback;
    private _paused;
    constructor(options: PartitionedRateLimiterOptions<Req, Res>);
    request(req: Req, options?: RateLimiterRequestOptions): Promise<Res>;
    clear(): void;
    pause(): void;
    resume(): void;
    getChildStats(partitionKey: string | null): RateLimiterStats | null;
    private _getChild;
}
