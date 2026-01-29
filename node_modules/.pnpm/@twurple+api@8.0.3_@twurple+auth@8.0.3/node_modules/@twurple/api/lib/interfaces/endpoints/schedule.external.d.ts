/** @private */
export interface HelixScheduleVacationData {
    start_time: string;
    end_time: string;
}
/** @private */
export interface HelixScheduleSegmentCategoryData {
    id: string;
    name: string;
}
/** @private */
export interface HelixScheduleSegmentData {
    id: string;
    start_time: string;
    end_time: string;
    title: string;
    canceled_until: string | null;
    category: HelixScheduleSegmentCategoryData | null;
    is_recurring: boolean;
}
/** @private */
export interface HelixScheduleData {
    segments: HelixScheduleSegmentData[] | null;
    broadcaster_id: string;
    broadcaster_name: string;
    broadcaster_login: string;
    vacation: HelixScheduleVacationData | null;
}
/** @private */
export interface HelixScheduleResponse {
    data: HelixScheduleData;
    pagination: {
        cursor?: string;
    };
}
//# sourceMappingURL=schedule.external.d.ts.map