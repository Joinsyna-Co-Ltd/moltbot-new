/**
 * Status of an unban request.
 */
export type HelixUnbanRequestStatus = 'pending' | 'approved' | 'denied' | 'acknowledged' | 'canceled';
/** @private */
export interface HelixAutoModSettingsData {
    broadcaster_id: string;
    moderator_id: string;
    overall_level: number | null;
    disability: number;
    aggression: number;
    sexuality_sex_or_gender: number;
    misogyny: number;
    bullying: number;
    swearing: number;
    race_ethnicity_or_religion: number;
    sex_based_terms: number;
}
/** @private */
export interface HelixAutoModStatusData {
    msg_id: string;
    is_permitted: boolean;
}
/** @private */
export interface HelixCommonBanUserData {
    user_id: string;
    moderator_id: string;
    created_at: string;
}
/** @private */
export interface HelixBanData extends HelixCommonBanUserData {
    user_login: string;
    user_name: string;
    moderator_login: string;
    moderator_name: string;
    expires_at: string;
    reason: string;
}
/** @private */
export interface HelixBanUserData extends HelixCommonBanUserData {
    broadcaster_id: string;
    end_time: string | null;
}
/** @private */
export interface HelixBlockedTermData {
    broadcaster_id: string;
    created_at: string;
    expires_at: string;
    id: string;
    moderator_id: string;
    text: string;
    updated_at: string;
}
/** @private */
export interface HelixModeratorData {
    user_id: string;
    user_login: string;
    user_name: string;
}
/** @private */
export interface HelixModeratedChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
}
/** @private */
export interface HelixShieldModeStatusData {
    is_active: boolean;
    moderator_id: string;
    moderator_login: string;
    moderator_name: string;
    last_activated_at: string;
}
/** @private */
export interface HelixUnbanRequestData extends HelixModeratedChannelData {
    id: string;
    moderator_id: string;
    moderator_login: string;
    moderator_name: string;
    user_id: string;
    user_login: string;
    user_name: string;
    text: string;
    status: HelixUnbanRequestStatus;
    created_at: string;
    resolution_text: string | null;
    resolved_at: string | null;
}
/** @private */
export interface HelixWarningData {
    broadcaster_id: string;
    moderator_id: string;
    user_id: string;
    reason: string;
}
//# sourceMappingURL=moderation.external.d.ts.map