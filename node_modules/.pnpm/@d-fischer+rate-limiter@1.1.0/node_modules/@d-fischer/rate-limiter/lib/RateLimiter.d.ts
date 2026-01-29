import type { QueueEntryLimitReachedBehavior } from './QueueEntry';
export interface RateLimiterRequestOptions {
    limitReachedBehavior?: QueueEntryLimitReachedBehavior;
}
export interface RateLimiter<Req, Res> {
    request: (req: Req, options?: RateLimiterRequestOptions) => Promise<Res>;
    clear: () => void;
    pause: () => void;
    resume: () => void;
    destroy?: () => void;
}
