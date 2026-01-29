import { type UserIdResolvable } from '@twurple/common';
import { type HelixChatChatterData, type HelixChatUserColor, type HelixUserEmoteData } from '../../interfaces/endpoints/chat.external.js';
import { type HelixSendChatAnnouncementParams, type HelixSendChatMessageAsAppParams, type HelixSendChatMessageParams, type HelixUpdateChatSettingsParams, type HelixUserEmotesFilter } from '../../interfaces/endpoints/chat.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { HelixPaginatedRequestWithTotal } from '../../utils/pagination/HelixPaginatedRequestWithTotal.js';
import { type HelixPaginatedResult, type HelixPaginatedResultWithTotal } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixChannelEmote } from './HelixChannelEmote.js';
import { HelixChatBadgeSet } from './HelixChatBadgeSet.js';
import { HelixChatChatter } from './HelixChatChatter.js';
import { HelixChatSettings } from './HelixChatSettings.js';
import { HelixEmote } from './HelixEmote.js';
import { HelixEmoteFromSet } from './HelixEmoteFromSet.js';
import { HelixPrivilegedChatSettings } from './HelixPrivilegedChatSettings.js';
import { HelixSentChatMessage } from './HelixSentChatMessage.js';
import { HelixSharedChatSession } from './HelixSharedChatSession.js';
import { HelixUserEmote } from './HelixUserEmote.js';
/**
 * The Helix API methods that deal with chat.
 *
 * Can be accessed using `client.chat` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const rewards = await api.chat.getChannelBadges('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Chat
 */
export declare class HelixChatApi extends BaseApi {
    /**
     * Gets the list of users that are connected to the broadcaster’s chat session.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster whose list of chatters you want to get.
     * @param pagination
     *
     * @expandParams
     */
    getChatters(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResultWithTotal<HelixChatChatter>>;
    /**
     * Creates a paginator for users that are connected to the broadcaster’s chat session.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster whose list of chatters you want to get.
     *
     * @expandParams
     */
    getChattersPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequestWithTotal<HelixChatChatterData, HelixChatChatter>;
    /**
     * Gets all global badges.
     */
    getGlobalBadges(): Promise<HelixChatBadgeSet[]>;
    /**
     * Gets all badges specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get badges for.
     */
    getChannelBadges(broadcaster: UserIdResolvable): Promise<HelixChatBadgeSet[]>;
    /**
     * Gets all global emotes.
     */
    getGlobalEmotes(): Promise<HelixEmote[]>;
    /**
     * Gets all emotes specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get emotes for.
     */
    getChannelEmotes(broadcaster: UserIdResolvable): Promise<HelixChannelEmote[]>;
    /**
     * Gets all emotes from a list of emote sets.
     *
     * @param setIds The IDs of the emote sets to get emotes from.
     */
    getEmotesFromSets(setIds: string[]): Promise<HelixEmoteFromSet[]>;
    /**
     * Gets emotes available to the user across all channels.
     *
     * @param user The ID of the user to get available emotes of.
     * @param filter Additional query filters.
     */
    getUserEmotes(user: UserIdResolvable, filter?: HelixUserEmotesFilter): Promise<HelixPaginatedResult<HelixUserEmote>>;
    /**
     * Creates a paginator for emotes available to the user across all channels.
     *
     * @param user The ID of the user to get available emotes of.
     * @param broadcaster The ID of a broadcaster you wish to get follower emotes of. Using this query parameter will
     * guarantee inclusion of the broadcaster’s follower emotes in the response body.
     *
     * If the user who retrieves their emotes is subscribed to the broadcaster specified, their follower emotes will
     * appear in the response body regardless of whether this query parameter is used.
     */
    getUserEmotesPaginated(user: UserIdResolvable, broadcaster?: UserIdResolvable): HelixPaginatedRequest<HelixUserEmoteData, HelixUserEmote>;
    /**
     * Gets the settings of a broadcaster's chat.
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    getSettings(broadcaster: UserIdResolvable): Promise<HelixChatSettings>;
    /**
     * Gets the settings of a broadcaster's chat, including the delay settings.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    getSettingsPrivileged(broadcaster: UserIdResolvable): Promise<HelixPrivilegedChatSettings>;
    /**
     * Updates the settings of a broadcaster's chat.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param settings The settings to change.
     */
    updateSettings(broadcaster: UserIdResolvable, settings: HelixUpdateChatSettingsParams): Promise<HelixPrivilegedChatSettings>;
    /**
     * Sends a chat message to a broadcaster's chat.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param message The message to send.
     * @param params
     */
    sendChatMessage(broadcaster: UserIdResolvable, message: string, params?: HelixSendChatMessageParams): Promise<HelixSentChatMessage>;
    /**
     * Sends a chat message to a broadcaster's chat, using an app token.
     *
     * This requires the scopes `user:write:chat` and `user:bot` for the `user` and `channel:bot` for the `broadcaster`.
     * `channel:bot` is not required if the `user` has moderator privileges in the `broadcaster`'s channel.
     *
     * These scope requirements can not be checked by the library, so they are just assumed.
     * Make sure to catch authorization errors yourself.
     *
     * @expandParams
     *
     * @param user The user to send the chat message from.
     * @param broadcaster The broadcaster the chat belongs to.
     * @param message The message to send.
     * @param params
     */
    sendChatMessageAsApp(user: UserIdResolvable, broadcaster: UserIdResolvable, message: string, params?: HelixSendChatMessageAsAppParams): Promise<HelixSentChatMessage>;
    /**
     * Sends an announcement to a broadcaster's chat.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param announcement The announcement to send.
     */
    sendAnnouncement(broadcaster: UserIdResolvable, announcement: HelixSendChatAnnouncementParams): Promise<void>;
    /**
     * Gets the chat colors for a list of users.
     *
     * Returns a Map with user IDs as keys and their colors as values.
     * The value is a color hex code, or `null` if the user did not set a color,
     * and unknown users will not be present in the map.
     *
     * @param users The users to get the chat colors of.
     */
    getColorsForUsers(users: UserIdResolvable[]): Promise<Map<string, string | null>>;
    /**
     * Gets the chat color for a user.
     *
     * Returns the color as hex code, `null` if the user did not set a color, or `undefined` if the user is unknown.
     *
     * @param user The user to get the chat color of.
     */
    getColorForUser(user: UserIdResolvable): Promise<string | null | undefined>;
    /**
     * Changes the chat color for a user.
     *
     * @param user The user to change the color of.
     * @param color The color to set.
     *
     * Note that hex codes can only be used by users that have a Prime or Turbo subscription.
     */
    setColorForUser(user: UserIdResolvable, color: HelixChatUserColor): Promise<void>;
    /**
     * Sends a shoutout to the specified broadcaster.
     * The broadcaster may send a shoutout once every 2 minutes. They may send the same broadcaster a shoutout once every 60 minutes.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param from The ID of the broadcaster that’s sending the shoutout.
     * @param to The ID of the broadcaster that’s receiving the shoutout.
     */
    shoutoutUser(from: UserIdResolvable, to: UserIdResolvable): Promise<void>;
    /**
     * Gets the active shared chat session for a channel.
     *
     * Returns `null` if there is no active shared chat session in the channel.
     *
     * @param broadcaster The broadcaster to get the active shared chat session for.
     */
    getSharedChatSession(broadcaster: UserIdResolvable): Promise<HelixSharedChatSession | null>;
    private _createModeratorActionQuery;
    private _handleUnsentChatMessage;
}
//# sourceMappingURL=HelixChatApi.d.ts.map