/** @internal */
export function createSearchChannelsQuery(query, filter) {
    return {
        query,
        live_only: filter.liveOnly?.toString(),
    };
}
