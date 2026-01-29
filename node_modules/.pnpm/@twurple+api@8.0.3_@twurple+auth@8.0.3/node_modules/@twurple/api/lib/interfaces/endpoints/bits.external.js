/** @internal */
export function createBitsLeaderboardQuery(params = {}) {
    const { count = 10, period = 'all', startDate, contextUserId } = params;
    return {
        count: count.toString(),
        period,
        started_at: startDate?.toISOString(),
        user_id: contextUserId,
    };
}
