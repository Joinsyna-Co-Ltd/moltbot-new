import { type LoggerOptions } from '@d-fischer/logger';
import type { RateLimiter, RateLimiterRequestOptions } from '../RateLimiter';
import { type RateLimiterStats } from '../RateLimiterStats';
export interface RateLimiterResponseParameters {
    limit: number;
    remaining: number;
    resetsAt: number;
}
export interface ResponseBasedRateLimiterConfig {
    logger?: Partial<LoggerOptions>;
}
export declare abstract class ResponseBasedRateLimiter<Req, Res> implements RateLimiter<Req, Res> {
    private _parameters?;
    private _queue;
    private _batchRunning;
    private _nextBatchTimer?;
    private _paused;
    private readonly _logger;
    constructor({ logger }: ResponseBasedRateLimiterConfig);
    request(req: Req, options?: RateLimiterRequestOptions): Promise<Res>;
    clear(): void;
    pause(): void;
    resume(): void;
    get stats(): RateLimiterStats;
    protected abstract doRequest(req: Req): Promise<Res>;
    protected abstract needsToRetryAfter(res: Res): number | null;
    protected abstract getParametersFromResponse(res: Res): RateLimiterResponseParameters;
    private _runRequestBatch;
    private _runNextBatch;
}
