/** @private */
export interface HelixUserRelationData {
    user_id: string;
    user_login: string;
    user_name: string;
}
/** @private */
export interface HelixDateRangeData {
    started_at: string;
    ended_at: string;
}
/** @private */
export interface HelixEventData<T, EventType extends string = string> {
    id: string;
    event_type: EventType;
    event_timestamp: string;
    version: string;
    event_data: T;
}
//# sourceMappingURL=generic.external.d.ts.map