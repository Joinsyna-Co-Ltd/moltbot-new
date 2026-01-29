import { extractUserId } from '@twurple/common';
/** @internal */
export function createClipCreateQuery(params) {
    const { channel, createAfterDelay = false, title, duration } = params;
    return {
        broadcaster_id: extractUserId(channel),
        has_delay: createAfterDelay.toString(),
        title,
        duration: duration?.toFixed(1),
    };
}
/** @internal */
export function createClipCreateFromVodQuery(params, editorId) {
    const { channel, title, duration, vodId, vodOffset } = params;
    return {
        broadcaster_id: extractUserId(channel),
        editor_id: editorId,
        title,
        duration: duration?.toFixed(1),
        vod_id: vodId,
        vod_offset: vodOffset.toString(),
    };
}
/** @internal */
export function createClipQuery(params) {
    const { filterType, ids, startDate, endDate, isFeatured } = params;
    return {
        [filterType]: ids,
        started_at: startDate,
        ended_at: endDate,
        is_featured: isFeatured?.toString(),
    };
}
