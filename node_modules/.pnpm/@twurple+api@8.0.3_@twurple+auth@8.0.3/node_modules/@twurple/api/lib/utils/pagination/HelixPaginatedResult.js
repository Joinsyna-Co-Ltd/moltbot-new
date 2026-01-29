/** @internal */ export function createPaginatedResult(response, type, client) {
    let dataCache = undefined;
    return {
        get data() {
            return (dataCache ??= response.data?.map(data => new type(data, client)) ?? []);
        },
        cursor: typeof response.pagination === 'string' ? response.pagination : response.pagination?.cursor,
    };
}
/** @internal */ export function createPaginatedResultWithTotal(response, type, client) {
    let dataCache = undefined;
    return {
        get data() {
            return (dataCache ??= response.data?.map(data => new type(data, client)) ?? []);
        },
        cursor: response.pagination.cursor,
        total: response.total,
    };
}
