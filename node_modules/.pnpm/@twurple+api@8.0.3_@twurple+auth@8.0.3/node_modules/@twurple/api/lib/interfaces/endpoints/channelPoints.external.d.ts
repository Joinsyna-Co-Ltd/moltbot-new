/**
 * The possible statuses of a custom Channel Points reward redemption you can set.
 */
export type HelixCustomRewardRedemptionTargetStatus = 'FULFILLED' | 'CANCELED';
/**
 * The possible statuses of a custom Channel Points reward redemption.
 */
export type HelixCustomRewardRedemptionStatus = 'UNFULFILLED' | HelixCustomRewardRedemptionTargetStatus;
/** @private */
export interface HelixCustomRewardRedemptionRewardData {
    id: string;
    title: string;
    prompt: string;
    cost: number;
}
/** @private */
export interface HelixCustomRewardRedemptionData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    user_input: string;
    status: HelixCustomRewardRedemptionStatus;
    redeemed_at: string;
    reward: HelixCustomRewardRedemptionRewardData;
}
/** @private */
export interface HelixCustomRewardImageData {
    url_1x: string;
    url_2x: string;
    url_4x: string;
}
/** @private */
export interface HelixCustomRewardMaxPerStreamSettingData {
    is_enabled: boolean;
    max_per_stream: number;
}
/** @private */
export interface HelixCustomRewardMaxPerUserPerStreamSettingData {
    is_enabled: boolean;
    max_per_user_per_stream: number;
}
/** @private */
export interface HelixCustomRewardGlobalCooldownSettingData {
    is_enabled: boolean;
    global_cooldown_seconds: number;
}
/** @private */
export interface HelixCustomRewardData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    id: string;
    image: HelixCustomRewardImageData | null;
    background_color: string;
    is_enabled: boolean;
    cost: number;
    title: string;
    prompt: string;
    is_user_input_required: boolean;
    max_per_stream_setting: HelixCustomRewardMaxPerStreamSettingData;
    max_per_user_per_stream_setting: HelixCustomRewardMaxPerUserPerStreamSettingData;
    global_cooldown_setting: HelixCustomRewardGlobalCooldownSettingData;
    is_paused: boolean;
    is_in_stock: boolean;
    default_image: HelixCustomRewardImageData;
    should_redemptions_skip_request_queue: boolean;
    redemptions_redeemed_current_stream: number | null;
    cooldown_expires_at: string;
}
//# sourceMappingURL=channelPoints.external.d.ts.map