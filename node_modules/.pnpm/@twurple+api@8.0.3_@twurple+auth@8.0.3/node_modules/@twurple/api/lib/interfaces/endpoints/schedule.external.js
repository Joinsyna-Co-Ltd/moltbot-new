import { extractUserId } from '@twurple/common';
/** @internal */
export function createScheduleQuery(broadcaster, filter) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        start_time: filter?.startDate,
        utc_offset: filter?.utcOffset?.toString(),
    };
}
/** @internal */
export function createScheduleSettingsUpdateQuery(broadcaster, settings) {
    if (settings.vacation) {
        return {
            broadcaster_id: extractUserId(broadcaster),
            is_vacation_enabled: 'true',
            vacation_start_time: settings.vacation.startDate,
            vacation_end_time: settings.vacation.endDate,
            timezone: settings.vacation.timezone,
        };
    }
    return {
        broadcaster_id: extractUserId(broadcaster),
        is_vacation_enabled: 'false',
    };
}
/** @internal */
export function createScheduleSegmentBody(data) {
    return {
        start_time: data.startDate,
        timezone: data.timezone,
        is_recurring: data.isRecurring,
        duration: data.duration,
        category_id: data.categoryId,
        title: data.title,
    };
}
/** @internal */
export function createScheduleSegmentModifyQuery(broadcaster, segmentId) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        id: segmentId,
    };
}
/** @internal */
export function createScheduleSegmentUpdateBody(data) {
    return {
        start_time: data.startDate,
        timezone: data.timezone,
        is_canceled: data.isCanceled,
        duration: data.duration,
        category_id: data.categoryId,
        title: data.title,
    };
}
