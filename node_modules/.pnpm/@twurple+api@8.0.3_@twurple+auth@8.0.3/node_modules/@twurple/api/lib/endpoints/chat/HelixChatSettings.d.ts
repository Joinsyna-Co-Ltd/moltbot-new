import { DataObject } from '@twurple/common';
import { type HelixChatSettingsData } from '../../interfaces/endpoints/chat.external.js';
/**
 * The settings of a broadcaster's chat.
 */
export declare class HelixChatSettings extends DataObject<HelixChatSettingsData> {
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * Whether slow mode is enabled.
     */
    get slowModeEnabled(): boolean;
    /**
     * The time to wait between messages in slow mode, in seconds.
     *
     * Is `null` if slow mode is not enabled.
     */
    get slowModeDelay(): number | null;
    /**
     * Whether follower only mode is enabled.
     */
    get followerOnlyModeEnabled(): boolean;
    /**
     * The time after which users are able to send messages after following, in minutes.
     *
     * Is `null` if follower only mode is not enabled,
     * but may also be `0` if you can send messages immediately after following.
     */
    get followerOnlyModeDelay(): number | null;
    /**
     * Whether subscriber only mode is enabled.
     */
    get subscriberOnlyModeEnabled(): boolean;
    /**
     * Whether emote only mode is enabled.
     */
    get emoteOnlyModeEnabled(): boolean;
    /**
     * Whether unique chat mode is enabled.
     */
    get uniqueChatModeEnabled(): boolean;
}
//# sourceMappingURL=HelixChatSettings.d.ts.map