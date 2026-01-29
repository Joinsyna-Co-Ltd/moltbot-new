/** @private */
export interface HelixChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    broadcaster_language: string;
    game_id: string;
    game_name: string;
    title: string;
    delay: number;
    tags: string[];
    content_classification_labels: string[];
    is_branded_content: boolean;
}
/** @private */
export interface HelixChannelEditorData {
    user_id: string;
    user_name: string;
    created_at: string;
}
/** @private */
export interface HelixChannelReferenceData {
    broadcaster_id: string;
    broadcaster_name: string;
    game_id: string;
    game_name: string;
    title: string;
}
/** @private */
export interface HelixFollowedChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    followed_at: string;
}
/** @private */
export interface HelixChannelFollowerData {
    user_id: string;
    user_login: string;
    user_name: string;
    followed_at: string;
}
/** @private */
export interface HelixAdScheduleData {
    snooze_count: number;
    snooze_refresh_at: number;
    next_ad_at: number;
    duration: number;
    last_ad_at: number;
    preroll_free_time: number;
}
/** @private */
export interface HelixSnoozeNextAdData {
    snooze_count: number;
    snooze_refresh_at: number;
    next_ad_at: number;
}
//# sourceMappingURL=channel.external.d.ts.map