import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * The settings of a broadcaster's chat.
 */
let HelixChatSettings = class HelixChatSettings extends DataObject {
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * Whether slow mode is enabled.
     */
    get slowModeEnabled() {
        return this[rawDataSymbol].slow_mode;
    }
    /**
     * The time to wait between messages in slow mode, in seconds.
     *
     * Is `null` if slow mode is not enabled.
     */
    get slowModeDelay() {
        return this[rawDataSymbol].slow_mode_wait_time;
    }
    /**
     * Whether follower only mode is enabled.
     */
    get followerOnlyModeEnabled() {
        return this[rawDataSymbol].follower_mode;
    }
    /**
     * The time after which users are able to send messages after following, in minutes.
     *
     * Is `null` if follower only mode is not enabled,
     * but may also be `0` if you can send messages immediately after following.
     */
    get followerOnlyModeDelay() {
        return this[rawDataSymbol].follower_mode_duration;
    }
    /**
     * Whether subscriber only mode is enabled.
     */
    get subscriberOnlyModeEnabled() {
        return this[rawDataSymbol].subscriber_mode;
    }
    /**
     * Whether emote only mode is enabled.
     */
    get emoteOnlyModeEnabled() {
        return this[rawDataSymbol].emote_mode;
    }
    /**
     * Whether unique chat mode is enabled.
     */
    get uniqueChatModeEnabled() {
        return this[rawDataSymbol].unique_chat_mode;
    }
};
HelixChatSettings = __decorate([
    rtfm('api', 'HelixChatSettings', 'broadcasterId')
], HelixChatSettings);
export { HelixChatSettings };
