export interface RateLimiterStats {
    lastKnownLimit: number | null;
    lastKnownRemainingRequests: number | null;
    lastKnownResetDate: Date | null;
}
