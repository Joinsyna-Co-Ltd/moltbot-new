import { type LoggerOptions } from '@d-fischer/logger';
import type { RateLimiter, RateLimiterRequestOptions } from '../RateLimiter';
export interface TimeBasedRateLimiterConfig<Req, Res> {
    bucketSize: number;
    timeFrame: number;
    logger?: Partial<LoggerOptions>;
    doRequest: (req: Req) => Promise<Res>;
}
export declare class TimeBasedRateLimiter<Req, Res> implements RateLimiter<Req, Res> {
    private _queue;
    private _usedFromBucket;
    private readonly _bucketSize;
    private readonly _timeFrame;
    private readonly _callback;
    private readonly _counterTimers;
    private _paused;
    private _destroyed;
    private readonly _logger;
    constructor({ logger, bucketSize, timeFrame, doRequest }: TimeBasedRateLimiterConfig<Req, Res>);
    request(req: Req, options?: RateLimiterRequestOptions): Promise<Res>;
    clear(): void;
    pause(): void;
    resume(): void;
    destroy(): void;
    private _runRequest;
    private _runNextRequest;
}
