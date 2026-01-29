import type { RateLimiter } from '../RateLimiter';
import { TimeBasedRateLimiter, type TimeBasedRateLimiterConfig } from './TimeBasedRateLimiter';
export declare class TimedPassthruRateLimiter<Req, Res> extends TimeBasedRateLimiter<Req, Res> {
    constructor(child: RateLimiter<Req, Res>, config: Omit<TimeBasedRateLimiterConfig<Req, Res>, 'doRequest'>);
}
