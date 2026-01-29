import { extractUserId } from '@twurple/common';
/** @internal */
export function createChatSettingsUpdateBody(settings) {
    return {
        slow_mode: settings.slowModeEnabled,
        slow_mode_wait_time: settings.slowModeDelay,
        follower_mode: settings.followerOnlyModeEnabled,
        follower_mode_duration: settings.followerOnlyModeDelay,
        subscriber_mode: settings.subscriberOnlyModeEnabled,
        emote_mode: settings.emoteOnlyModeEnabled,
        unique_chat_mode: settings.uniqueChatModeEnabled,
        non_moderator_chat_delay: settings.nonModeratorChatDelayEnabled,
        non_moderator_chat_delay_duration: settings.nonModeratorChatDelay,
    };
}
/** @internal */
export function createChatColorUpdateQuery(user, color) {
    return {
        user_id: extractUserId(user),
        color,
    };
}
/** @internal */
export function createShoutoutQuery(from, to, moderatorId) {
    return {
        from_broadcaster_id: extractUserId(from),
        to_broadcaster_id: extractUserId(to),
        moderator_id: moderatorId,
    };
}
/** @internal */
export function createSendChatMessageQuery(broadcaster, sender) {
    return {
        broadcaster_id: broadcaster,
        sender_id: sender,
    };
}
/** @internal */
export function createSendChatMessageBody(message, params) {
    return {
        message,
        reply_parent_message_id: params?.replyParentMessageId,
    };
}
/** @internal */
export function createSendChatMessageAsAppBody(message, params) {
    return {
        message,
        reply_parent_message_id: params?.replyParentMessageId,
        for_source_only: params?.forSourceOnly,
    };
}
