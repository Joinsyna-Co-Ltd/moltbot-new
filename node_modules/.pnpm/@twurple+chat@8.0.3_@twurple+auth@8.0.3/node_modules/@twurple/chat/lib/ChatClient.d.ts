import { type LoggerOptions } from '@d-fischer/logger';
import { type RateLimiterRequestOptions } from '@d-fischer/rate-limiter';
import { type ResolvableValue } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import { type AuthProvider } from '@twurple/auth';
import { IrcClient, type WebSocketConnectionOptions } from 'ircv3';
import { ClearChat } from './caps/twitchCommands/messageTypes/ClearChat.js';
import { UserNotice } from './caps/twitchCommands/messageTypes/UserNotice.js';
import { Whisper } from './caps/twitchCommands/messageTypes/Whisper.js';
import { ClearMsg } from './caps/twitchTags/messageTypes/ClearMsg.js';
import { type ChatSayMessageAttributes } from './ChatMessageAttributes.js';
import { ChatMessage } from './commands/ChatMessage.js';
import type { ChatAnnouncementInfo } from './userNotices/ChatAnnouncementInfo.js';
import type { ChatBitsBadgeUpgradeInfo } from './userNotices/ChatBitsBadgeUpgradeInfo.js';
import type { ChatCommunityPayForwardInfo } from './userNotices/ChatCommunityPayForwardInfo.js';
import type { ChatCommunitySubInfo } from './userNotices/ChatCommunitySubInfo.js';
import type { ChatPrimeCommunityGiftInfo } from './userNotices/ChatPrimeCommunityGiftInfo.js';
import type { ChatRaidInfo } from './userNotices/ChatRaidInfo.js';
import type { ChatRewardGiftInfo } from './userNotices/ChatRewardGiftInfo.js';
import type { ChatRitualInfo } from './userNotices/ChatRitualInfo.js';
import type { ChatStandardPayForwardInfo } from './userNotices/ChatStandardPayForwardInfo.js';
import type { ChatSubExtendInfo, ChatSubGiftInfo, ChatSubGiftUpgradeInfo, ChatSubInfo, ChatSubUpgradeInfo } from './userNotices/ChatSubInfo.js';
/**
 * A Twitch bot level, i.e. whether you're connecting as a known or verified bot.
 */
export type TwitchBotLevel = 'none' | 'known' | 'verified';
/**
 * Options for a chat client.
 */
export interface ChatClientOptions {
    /**
     * The authentication provider to use for getting the chat credentials.
     *
     * If you don't pass this, the chat client will connect anonymously.
     */
    authProvider?: AuthProvider;
    /**
     * Whether to request a token with only read permission.
     *
     * Ignored if `legacyScopes` is `true`.
     */
    readOnly?: boolean;
    /**
     * Whether to request a token with the old chat permission scope.
     *
     * If you're not sure whether this is necessary, just try leaving this off, and if it doesn't work, turn it on and try again.
     */
    legacyScopes?: boolean;
    /**
     * Options to pass to the logger.
     */
    logger?: Partial<LoggerOptions>;
    /**
     * Whether to connect securely using SSL.
     *
     * You should not disable this except for debugging purposes.
     */
    ssl?: boolean;
    /**
     * Custom hostname for connecting to chat.
     */
    hostName?: string;
    /**
     * Whether to use a WebSocket to connect to chat.
     */
    webSocket?: boolean;
    /**
     * The connection options for a WebSocket connection.
     *
     * If not using WebSockets, this is ignored.
     */
    connectionOptions?: WebSocketConnectionOptions;
    /**
     * Whether to receive JOIN and PART messages from Twitch chat.
     */
    requestMembershipEvents?: boolean;
    /**
     * Channels to join after connecting.
     *
     * May also be a function (sync or async) that returns a list of channels.
     */
    channels?: ResolvableValue<string[]>;
    /**
     * Whether to rejoin the channels the client had joined when a reconnect occurs.
     *
     * This means that the `channels` option will only be resolved on the initial connection.
     */
    rejoinChannelsOnReconnect?: boolean;
    /**
     * Whether you're guaranteed to be a mod in all joined channels.
     *
     * This raises the rate limit and lifts the one-second-between-messages rule,
     * but if your bot is not a mod in one of the channels, it subjects you to messages
     * possibly silently not being delivered and your bot possibly getting banned.
     */
    isAlwaysMod?: boolean;
    /**
     * Your bot level, i.e. whether you're a known or verified bot.
     *
     * This defaults to 'none', which limits your messages to the standard rate limit.
     */
    botLevel?: TwitchBotLevel;
    /**
     * The intents to use to query the auth provider.
     *
     * The "chat" intent will always be queried last, after the ones you give here.
     */
    authIntents?: string[];
}
/**
 * An interface to Twitch chat.
 */
export declare class ChatClient extends EventEmitter {
    private readonly _useLegacyScopes;
    private readonly _readOnly;
    private readonly _authIntents;
    private _authToken?;
    private _authVerified;
    private _authRetryTimer?;
    private _authRetryCount;
    private readonly _chatLogger;
    private readonly _isAlwaysMod;
    private readonly _botLevel;
    private _messageRateLimiter?;
    private _joinRateLimiter?;
    private readonly _ircClient;
    /**
     * Fires when the client successfully connects to the chat server.
     *
     * @eventListener
     */
    readonly onConnect: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    /**
     * Fires when the client disconnects from the chat server.
     *
     * @eventListener
     * @param manually Whether the disconnect was requested by the user.
     * @param reason The error that caused the disconnect, or `undefined` if there was no error.
     */
    readonly onDisconnect: import("@d-fischer/typed-event-emitter").EventBinder<[manually: boolean, reason?: Error | undefined]>;
    /**
     * Fires when a user is timed out from a channel.
     *
     * @eventListener
     * @param channel The channel the user is timed out from.
     * @param user The timed out user.
     * @param duration The duration of the timeout, in seconds.
     * @param msg The full message object containing all message and user information.
     */
    readonly onTimeout: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, duration: number, msg: ClearChat]>;
    /**
     * Fires when a user is permanently banned from a channel.
     *
     * @eventListener
     * @param channel The channel the user is banned from.
     * @param user The banned user.
     * @param msg The full message object containing all message and user information.
     */
    readonly onBan: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, msg: ClearChat]>;
    /**
     * Fires when a user upgrades their bits badge in a channel.
     *
     * @eventListener
     * @param channel The channel where the bits badge was upgraded.
     * @param user The user that has upgraded their bits badge.
     * @param ritualInfo Additional information about the upgrade.
     * @param msg The full message object containing all message and user information.
     */
    readonly onBitsBadgeUpgrade: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, upgradeInfo: ChatBitsBadgeUpgradeInfo, msg: UserNotice]>;
    /**
     * Fires when the chat of a channel is cleared.
     *
     * @eventListener
     * @param channel The channel whose chat is cleared.
     * @param msg The full message object containing all message and user information.
     */
    readonly onChatClear: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, msg: ClearChat]>;
    /**
     * Fires when emote-only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where emote-only mode is being toggled.
     * @param enabled Whether emote-only mode is being enabled. If false, it's being disabled.
     */
    readonly onEmoteOnly: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, enabled: boolean]>;
    /**
     * Fires when followers-only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where followers-only mode is being toggled.
     * @param enabled Whether followers-only mode is being enabled. If false, it's being disabled.
     * @param delay The time (in minutes) a user needs to follow the channel to be able to talk. Only available when `enabled === true`.
     */
    readonly onFollowersOnly: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, enabled: boolean, delay?: number | undefined]>;
    /**
     * Fires when a user joins a channel.
     *
     * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
     *
     * Please note that unless you enabled the `requestMembershipEvents` option, this will only react to your own joins.
     *
     * @eventListener
     * @param channel The channel that is being joined.
     * @param user The user that joined.
     */
    readonly onJoin: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string]>;
    /**
     * Fires when you fail to join a channel.
     *
     * @eventListener
     * @param channel The channel that you tried to join.
     * @param reason The reason for the failure.
     */
    readonly onJoinFailure: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, reason: string]>;
    /**
     * Fires when a user leaves ("parts") a channel.
     *
     * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
     *
     * Please note that unless you enabled the `requestMembershipEvents` option, this will only react to your own parts.
     *
     * @eventListener
     * @param channel The channel that is being left.
     * @param user The user that left.
     */
    readonly onPart: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string]>;
    /**
     * Fires when a single message is removed from a channel.
     *
     * @eventListener
     * @param channel The channel where the message was removed.
     * @param messageId The ID of the message that was removed.
     * @param msg The full message object containing all message and user information.
     *
     * This is *not* the message that was removed. The text of the message is available using `msg.params.message` though.
     */
    readonly onMessageRemove: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, messageId: string, msg: ClearMsg]>;
    /**
     * Fires when unique chat mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where unique chat mode is being toggled.
     * @param enabled Whether unique chat mode is being enabled. If false, it's being disabled.
     */
    readonly onUniqueChat: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, enabled: boolean]>;
    /**
     * Fires when a user raids a channel.
     *
     * @eventListener
     * @param channel The channel that was raided.
     * @param user The user that has raided the channel.
     * @param raidInfo Additional information about the raid.
     * @param msg The full message object containing all message and user information.
     */
    readonly onRaid: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, raidInfo: ChatRaidInfo, msg: UserNotice]>;
    /**
     * Fires when a user cancels a raid.
     *
     * @eventListener
     * @param channel The channel where the raid was cancelled.
     * @param msg The full message object containing all message and user information.
     */
    readonly onRaidCancel: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, msg: UserNotice]>;
    /**
     * Fires when a user performs a "ritual" in a channel.
     *
     * @eventListener
     * @param channel The channel where the ritual was performed.
     * @param user The user that has performed the ritual.
     * @param ritualInfo Additional information about the ritual.
     * @param msg The full message object containing all message and user information.
     */
    readonly onRitual: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, ritualInfo: ChatRitualInfo, msg: UserNotice]>;
    /**
     * Fires when slow mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where slow mode is being toggled.
     * @param enabled Whether slow mode is being enabled. If false, it's being disabled.
     * @param delay The time (in seconds) a user has to wait between sending messages. Only set when enabling slow mode.
     */
    readonly onSlow: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, enabled: boolean, delay?: number | undefined]>;
    /**
     * Fires when sub only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where sub only mode is being toggled.
     * @param enabled Whether sub only mode is being enabled. If false, it's being disabled.
     */
    readonly onSubsOnly: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, enabled: boolean]>;
    /**
     * Fires when a user subscribes to a channel.
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The subscribing user.
     * @param subInfo Additional information about the subscription.
     * @param msg The full message object containing all message and user information.
     */
    readonly onSub: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubInfo, msg: UserNotice]>;
    /**
     * Fires when a user resubscribes to a channel.
     *
     * @eventListener
     * @param channel The channel that was resubscribed to.
     * @param user The resubscribing user.
     * @param subInfo Additional information about the resubscription.
     * @param msg The full message object containing all message and user information.
     */
    readonly onResub: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubInfo, msg: UserNotice]>;
    /**
     * Fires when a user gifts a subscription to a channel to another user.
     *
     * Community subs also fire multiple `onSubGift` events.
     * To prevent alert spam, check [Sub gift spam](/docs/examples/chat/sub-gift-spam).
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The user that the subscription was gifted to. The gifting user is defined in `subInfo.gifter`.
     * @param subInfo Additional information about the subscription.
     * @param msg The full message object containing all message and user information.
     */
    readonly onSubGift: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubGiftInfo, msg: UserNotice]>;
    /**
     * Fires when a user gifts random subscriptions to the community of a channel.
     *
     * Community subs also fire multiple `onSubGift` events.
     * To prevent alert spam, check [Sub gift spam](/docs/examples/chat/sub-gift-spam).
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The gifting user.
     * @param subInfo Additional information about the community subscription.
     * @param msg The full message object containing all message and user information.
     */
    readonly onCommunitySub: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatCommunitySubInfo, msg: UserNotice]>;
    /**
     * Fires when a user extends their subscription using a Sub Token.
     *
     * @eventListener
     * @param channel The channel where the subscription was extended.
     * @param user The user that extended their subscription.
     * @param subInfo Additional information about the subscription extension.
     * @param msg The full message object containing all message and user information.
     */
    readonly onSubExtend: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubExtendInfo, msg: UserNotice]>;
    /**
     * Fires when a user gifts rewards during a special event.
     *
     * @eventListener
     * @param channel The channel where the rewards were gifted.
     * @param user The user that gifted the rewards.
     * @param rewardGiftInfo Additional information about the reward gift.
     * @param msg The full message object containing all message and user information.
     */
    readonly onRewardGift: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, rewardGiftInfo: ChatRewardGiftInfo, msg: UserNotice]>;
    /**
     * Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
     *
     * @eventListener
     * @param channel The channel where the subscription was upgraded.
     * @param user The user that upgraded their subscription.
     * @param subInfo Additional information about the subscription upgrade.
     * @param msg The full message object containing all message and user information.
     */
    readonly onPrimePaidUpgrade: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubUpgradeInfo, msg: UserNotice]>;
    /**
     * Fires when a user upgrades their gift subscription to a paid subscription in a channel.
     *
     * @eventListener
     * @param channel The channel where the subscription was upgraded.
     * @param user The user that upgraded their subscription.
     * @param subInfo Additional information about the subscription upgrade.
     * @param msg The full message object containing all message and user information.
     */
    readonly onGiftPaidUpgrade: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatSubGiftUpgradeInfo, msg: UserNotice]>;
    /**
     * Fires when a user gifts a Twitch Prime benefit to the channel.
     *
     * @eventListener
     * @param channel The channel where the benefit was gifted.
     * @param user The user that received the gift.
     *
     * **WARNING:** This is a *display name* and thus will not work as an identifier for the API (login) in some cases.
     * @param subInfo Additional information about the gift.
     * @param msg The full message object containing all message and user information.
     */
    readonly onPrimeCommunityGift: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, subInfo: ChatPrimeCommunityGiftInfo, msg: UserNotice]>;
    /**
     * Fires when a user pays forward a subscription that was gifted to them to a specific user.
     *
     * @eventListener
     * @param channel The channel where the gift was forwarded.
     * @param user The user that forwarded the gift.
     * @param forwardInfo Additional information about the gift.
     * @param msg The full message object containing all message and user information.
     */
    readonly onStandardPayForward: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, forwardInfo: ChatStandardPayForwardInfo, msg: UserNotice]>;
    /**
     * Fires when a user pays forward a subscription that was gifted to them to the community.
     *
     * @eventListener
     * @param channel The channel where the gift was forwarded.
     * @param user The user that forwarded the gift.
     * @param forwardInfo Additional information about the gift.
     * @param msg The full message object containing all message and user information.
     */
    readonly onCommunityPayForward: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, forwardInfo: ChatCommunityPayForwardInfo, msg: UserNotice]>;
    /**
     * Fires when a user sends an announcement (/announce) to a channel.
     *
     * @eventListener
     * @param channel The channel the announcement was sent to.
     * @param user The user that sent the announcement.
     * @param announcementInfo Additional information about the announcement.
     * @param msg The full message object containing all message and user information.
     */
    readonly onAnnouncement: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, announcementInfo: ChatAnnouncementInfo, msg: UserNotice]>;
    /**
     * Fires when receiving a whisper from another user.
     *
     * @eventListener
     * @param user The user that sent the whisper.
     * @param text The message text.
     * @param msg The full message object containing all message and user information.
     */
    readonly onWhisper: import("@d-fischer/typed-event-emitter").EventBinder<[user: string, text: string, msg: Whisper]>;
    /**
     * Fires when you tried to execute a command you don't have sufficient permission for.
     *
     * @eventListener
     * @param channel The channel that a command without sufficient permissions was executed on.
     * @param text The message text.
     */
    readonly onNoPermission: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, text: string]>;
    /**
     * Fires when a message you tried to send gets rejected by the ratelimiter.
     *
     * @eventListener
     * @param channel The channel that was attempted to send to.
     * @param text The message text.
     */
    readonly onMessageRatelimit: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, text: string]>;
    /**
     * Fires when authentication succeeds.
     *
     * @eventListener
     */
    readonly onAuthenticationSuccess: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    /**
     * Fires when authentication fails.
     *
     * @eventListener
     * @param text The message text.
     * @param retryCount The number of authentication attempts, including this one, that failed in the current attempt to connect.
     *
     * Resets when authentication succeeds.
     */
    readonly onAuthenticationFailure: import("@d-fischer/typed-event-emitter").EventBinder<[text: string, retryCount: number]>;
    /**
     * Fires when fetching a token fails.
     *
     * @eventListener
     * @param error The error that was thrown.
     */
    readonly onTokenFetchFailure: import("@d-fischer/typed-event-emitter").EventBinder<[error: Error]>;
    /**
     * Fires when sending a message fails.
     *
     * @eventListener
     * @param channel The channel that rejected the message.
     * @param reason The reason for the failure, e.g. you're banned (msg_banned)
     */
    readonly onMessageFailed: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, reason: string]>;
    /**
     * Fires when a user sends a message to a channel.
     *
     * @eventListener
     * @param channel The channel the message was sent to.
     * @param user The user that sent the message.
     * @param text The message text.
     * @param msg The full message object containing all message and user information.
     */
    readonly onMessage: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, text: string, msg: ChatMessage]>;
    /**
     * Fires when a user sends an action (/me) to a channel.
     *
     * @eventListener
     * @param channel The channel the action was sent to.
     * @param user The user that sent the action.
     * @param text The action text.
     * @param msg The full message object containing all message and user information.
     */
    readonly onAction: import("@d-fischer/typed-event-emitter").EventBinder<[channel: string, user: string, text: string, msg: ChatMessage]>;
    private readonly _onJoinResult;
    /**
     * Creates a new Twitch chat client.
     *
     * @expandParams
     *
     * @param config
     */
    constructor(config?: ChatClientOptions);
    /**
     * Connects to the chat server.
     */
    connect(): void;
    /**
     * The underlying IRC client. Use sparingly.
     */
    get irc(): IrcClient;
    /**
     * Whether the chat client is currently connected.
     */
    get isConnected(): boolean;
    /**
     * Whether the chat client is currently connecting.
     */
    get isConnecting(): boolean;
    /**
     * The channels the client is currently in.
     */
    get currentChannels(): string[];
    /**
     * Sends a regular chat message to a channel.
     *
     * @param channel The channel to send the message to.
     * @param text The message to send.
     * @param attributes The attributes to add to the message.
     * @param rateLimiterOptions Options to pass to the rate limiter.
     */
    say(channel: string, text: string, attributes?: ChatSayMessageAttributes, rateLimiterOptions?: RateLimiterRequestOptions): Promise<void>;
    /**
     * Sends an action message (/me) to a channel.
     *
     * @param channel The channel to send the message to.
     * @param text The message to send.
     * @param rateLimiterOptions Options to pass to the rate limiter.
     */
    action(channel: string, text: string, rateLimiterOptions?: RateLimiterRequestOptions): Promise<void>;
    /**
     * Joins a channel.
     *
     * @param channel The channel to join.
     */
    join(channel: string): Promise<void>;
    /**
     * Leaves a channel ("part" in IRC terms).
     *
     * @param channel The channel to leave.
     */
    part(channel: string): void;
    /**
     * Disconnects from the chat server.
     */
    quit(): void;
    /**
     * Reconnects to the chat server.
     */
    reconnect(): void;
    private _getAuthToken;
    private _getNecessaryScopes;
    private static _generateJustinfanNick;
    private _initializeRateLimiters;
}
//# sourceMappingURL=ChatClient.d.ts.map