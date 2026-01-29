/**
 * The subscription tier necessary to unlock an emote. 1000 means tier 1, and so on.
 */
export type HelixChannelEmoteSubscriptionTier = '1000' | '2000' | '3000';
/** @private */
export interface HelixEmoteImageData {
    url_1x: string;
    url_2x: string;
    url_4x: string;
}
/** @private */
export type HelixEmoteImageScale = 1 | 2 | 4;
/** @private */
export type HelixEmoteFormat = 'static' | 'animated';
/** @private */
export type HelixEmoteScale = '1.0' | '2.0' | '3.0';
/** @private */
export type HelixEmoteThemeMode = 'light' | 'dark';
/** @private */
export interface HelixEmoteBaseData {
    id: string;
    name: string;
    format: HelixEmoteFormat[];
    scale: HelixEmoteScale[];
    theme_mode: HelixEmoteThemeMode[];
}
/** @private */
export interface HelixEmoteData extends HelixEmoteBaseData {
    images: HelixEmoteImageData;
}
/** @private */
export interface HelixChannelEmoteData extends HelixEmoteData {
    tier: HelixChannelEmoteSubscriptionTier | '';
    emote_type: string;
    emote_set_id: string;
}
/** @private */
export interface HelixEmoteFromSetData extends HelixEmoteData {
    emote_type: string;
    emote_set_id: string;
    owner_id: string;
}
/** @private */
export interface HelixUserEmoteData extends HelixEmoteBaseData {
    emote_type: string;
    emote_set_id: string;
    owner_id: string;
}
/** @private */
export interface HelixChatBadgeVersionData {
    id: string;
    image_url_1x: string;
    image_url_2x: string;
    image_url_4x: string;
    title: string;
    description: string;
    click_action: string | null;
    click_url: string | null;
}
/** @private */
export interface HelixChatBadgeSetData {
    set_id: string;
    versions: HelixChatBadgeVersionData[];
}
/** @private */
export interface HelixSentChatMessageData {
    message_id: string;
    is_sent: boolean;
    drop_reason?: {
        code: string;
        message: string;
    };
}
/**
 * The color used to highlight an announcement.
 */
export type HelixChatAnnouncementColor = 'blue' | 'green' | 'orange' | 'purple' | 'primary';
/**
 * Colors that can be used by users in chat.
 *
 * Note that hex codes can only be used by users that have a Prime or Turbo subscription.
 */
export type HelixChatUserColor = 'blue' | 'blue_violet' | 'cadet_blue' | 'chocolate' | 'coral' | 'dodger_blue' | 'firebrick' | 'golden_rod' | 'green' | 'hot_pink' | 'orange_red' | 'red' | 'sea_green' | 'spring_green' | 'yellow_green' | `#${string}`;
/** @private */
export interface HelixChatChatterData {
    user_id: string;
    user_login: string;
    user_name: string;
}
/** @private */
export interface HelixChatColorDefinitionData {
    user_id: string;
    user_name: string;
    user_login: string;
    color: string;
}
/** @private */
export interface HelixChatSettingsData {
    broadcaster_id: string;
    slow_mode: boolean;
    slow_mode_wait_time: number | null;
    follower_mode: boolean;
    follower_mode_duration: number | null;
    subscriber_mode: boolean;
    emote_mode: boolean;
    unique_chat_mode: boolean;
}
/** @private */
export interface HelixPrivilegedChatSettingsData extends HelixChatSettingsData {
    moderator_id: string;
    non_moderator_chat_delay: boolean;
    non_moderator_chat_delay_duration: number | null;
}
//# sourceMappingURL=chat.external.d.ts.map