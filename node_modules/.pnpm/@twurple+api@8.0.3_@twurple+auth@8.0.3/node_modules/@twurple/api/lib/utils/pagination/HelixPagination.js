/** @internal */
export function createPaginationQuery({ after, before, limit } = {}) {
    return {
        after,
        before,
        first: limit?.toString(),
    };
}
