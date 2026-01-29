import type { HelixPaginatedResponse } from '@twurple/api-call';
import { type UserIdResolvable } from '@twurple/common';
import { type HelixEventSubSubscriptionStatus, type HelixEventSubConduitShardData } from '../../interfaces/endpoints/eventSub.external.js';
import { type HelixEventSubDropEntitlementGrantFilter, type HelixEventSubTransportOptions, type HelixPaginatedEventSubSubscriptionsResult, type HelixEventSubConduitShardsOptions } from '../../interfaces/endpoints/eventSub.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixEventSubSubscription } from './HelixEventSubSubscription.js';
import { HelixPaginatedEventSubSubscriptionsRequest } from './HelixPaginatedEventSubSubscriptionsRequest.js';
import { HelixEventSubConduit } from './HelixEventSubConduit.js';
import { HelixEventSubConduitShard } from './HelixEventSubConduitShard.js';
/**
 * The API methods that deal with EventSub.
 *
 * Can be accessed using `client.eventSub` on an {@link ApiClient} instance.
 *
 * ## Before using these methods...
 *
 * All methods in this class assume that you are already running a working EventSub listener reachable using the given transport.
 *
 * If you don't already have one, we recommend use of the `@twurple/eventsub-http` or `@twurple/eventsub-ws` libraries,
 * which handle subscribing and unsubscribing to these topics automatically.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * await api.eventSub.subscribeToUserFollowsTo('125328655', { callbackUrl: 'https://example.com' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle EventSub
 */
export declare class HelixEventSubApi extends BaseApi {
    /**
     * Gets the current EventSub subscriptions for the current client.
     *
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptions(pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions for the current client.
     */
    getSubscriptionsPaginated(): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForStatus(status: HelixEventSubSubscriptionStatus, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     */
    getSubscriptionsForStatusPaginated(status: HelixEventSubSubscriptionStatus): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForType(type: string, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     */
    getSubscriptionsForTypePaginated(type: string): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions for the current user and client.
     *
     * @param user The user to get subscriptions for.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForUser(user: UserIdResolvable, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param user The user to get subscriptions for.
     */
    getSubscriptionsForUserPaginated(user: UserIdResolvable): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Sends an arbitrary request to subscribe to an event.
     *
     * You can only create WebHook transport subscriptions using app tokens
     * and WebSocket transport subscriptions using user tokens.
     *
     * @param type The type of the event.
     * @param version The version of the event.
     * @param condition The condition of the subscription.
     * @param transport The transport of the subscription.
     * @param user The user to create the subscription in context of.
     * @param requiredScopeSet The scope set required by the subscription. Will only be checked for applicable transports.
     * @param canOverrideScopedUserContext Whether the auth user context can be overridden.
     * @param isBatched Whether to enable batching for the subscription. Is only supported for select topics.
     */
    createSubscription(type: string, version: string, condition: Record<string, unknown>, transport: HelixEventSubTransportOptions, user?: UserIdResolvable, requiredScopeSet?: string[], canOverrideScopedUserContext?: boolean, isBatched?: boolean): Promise<HelixEventSubSubscription>;
    /**
     * Deletes a subscription.
     *
     * @param id The ID of the subscription.
     */
    deleteSubscription(id: string): Promise<void>;
    /**
     * Deletes *all* subscriptions.
     */
    deleteAllSubscriptions(): Promise<void>;
    /**
     * Deletes all broken subscriptions, i.e. all that are not enabled or pending verification.
     */
    deleteBrokenSubscriptions(): Promise<void>;
    /**
     * Subscribe to events that represent a stream going live.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    subscribeToStreamOnlineEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a stream going offline.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    subscribeToStreamOfflineEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a channel updating their metadata.
     *
     * @param broadcaster The broadcaster you want to listen to update events for.
     * @param transport The transport options.
     */
    subscribeToChannelUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user following a channel.
     *
     * @param broadcaster The broadcaster you want to listen to follow events for.
     * @param transport The transport options.
     */
    subscribeToChannelFollowEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user subscribing to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscribe events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user gifting another user a subscription to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscription gift events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionGiftEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's subscription to a channel being announced.
     *
     * @param broadcaster The broadcaster you want to listen to subscription message events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionMessageEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's subscription to a channel ending.
     *
     * @param broadcaster The broadcaster you want to listen to subscription end events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user cheering bits to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to cheer events for.
     * @param transport The transport options.
     */
    subscribeToChannelCheerEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignStartEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignStopEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user donating to a charity campaign in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityDonationEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign progressing in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user being banned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to ban events for.
     * @param transport The transport options.
     */
    subscribeToChannelBanEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user being unbanned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to unban events for.
     * @param transport The transport options.
     */
    subscribeToChannelUnbanEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent Shield Mode being activated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode activation events for.
     * @param transport The transport options.
     */
    subscribeToChannelShieldModeBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent Shield Mode being deactivated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode deactivation events for.
     * @param transport The transport options.
     */
    subscribeToChannelShieldModeEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a moderator being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator add events for.
     * @param transport The transport options.
     */
    subscribeToChannelModeratorAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a moderator being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelModeratorRemoveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster raiding another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to outgoing raid events for.
     * @param transport The transport options.
     */
    subscribeToChannelRaidEventsFrom(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster being raided by another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to incoming raid events for.
     * @param transport The transport options.
     */
    subscribeToChannelRaidEventsTo(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward add events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being updated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being updated.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param rewardId The ID of the reward you want to listen to update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardUpdateEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardRemoveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param rewardId The ID of the reward you want to listen to remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardRemoveEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param rewardId The ID of the reward you want to listen to redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionAddEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward's redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param rewardId The ID of the reward you want to listen to redemption updates for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionUpdateEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points automatic reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to automatic reward redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelAutomaticRewardRedemptionAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points automatic reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to automatic reward redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelAutomaticRewardRedemptionAddV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll progress events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll end events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction preogress events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction being locked in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction lock events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionLockEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction end events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the beginning of a creator goal event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to goal begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelGoalBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent progress towards a creator goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal progress events.
     * @param transport The transport options.
     */
    subscribeToChannelGoalProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the end of a creator goal event.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal end events.
     * @param transport The transport options.
     */
    subscribeToChannelGoalEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the beginning of a Hype Train event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Hype train begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent progress towards the Hype Train goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train progress events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the end of a Hype Train event.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train end events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the beginning of a Hype Train event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Hype train begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainBeginV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent progress towards the Hype Train goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train progress events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainProgressV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the end of a Hype Train event.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train end events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainEndV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster shouting out another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to outgoing shoutout events.
     * @param transport The transport options.
     */
    subscribeToChannelShoutoutCreateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster being shouting out by another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to incoming shoutout events.
     * @param transport The transport options.
     */
    subscribeToChannelShoutoutReceiveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent an ad break beginning in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to ad break begin events.
     * @param transport The transport options.
     */
    subscribeToChannelAdBreakBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a channel's chat being cleared.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat clear events.
     * @param transport The transport options.
     */
    subscribeToChannelChatClearEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's chat messages being cleared in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to user chat message clear events.
     * @param transport The transport options.
     */
    subscribeToChannelChatClearUserMessagesEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a chat message being deleted in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat message delete events.
     * @param transport The transport options.
     */
    subscribeToChannelChatMessageDeleteEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a chat notification in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat notification events.
     * @param transport The transport options.
     */
    subscribeToChannelChatNotificationEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a chat message in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat message events.
     * @param transport The transport options.
     */
    subscribeToChannelChatMessageEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent chat settings being updated in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat settings update events.
     * @param transport The transport options.
     */
    subscribeToChannelChatSettingsUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a created unban requests in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to unban requests.
     * @param transport The transport options.
     */
    subscribeToChannelUnbanRequestCreateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a resolved unban requests in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to unban requests.
     * @param transport The transport options.
     */
    subscribeToChannelUnbanRequestResolveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a moderator performing an action on a channel.
     *
     * This requires the following scopes:
     * - `moderator:read:blocked_terms` OR `moderator:manage:blocked_terms`
     * - `moderator:read:chat_settings` OR `moderator:manage:chat_settings`
     * - `moderator:read:unban_requests` OR `moderator:manage:unban_requests`
     * - `moderator:read:banned_users` OR `moderator:manage:banned_users`
     * - `moderator:read:chat_messages` OR `moderator:manage:chat_messages`
     * - `moderator:read:warnings` OR `moderator:manage:warnings`
     * - `moderator:read:moderators`
     * - `moderator:read:vips`
     *
     * These scope requirements cannot be checked by the library, so they are just assumed.
     * Make sure to catch authorization errors yourself.
     *
     * @param broadcaster The broadcaster for which you want to listen to moderation events.
     * @param transport The transport options.
     */
    subscribeToChannelModerateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a warning being acknowledged by a user.
     *
     * @param broadcaster The broadcaster for whom you want to listen to warnings.
     * @param transport The transport options.
     */
    subscribeToChannelWarningAcknowledgeEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a warning sent to a user.
     *
     * @param broadcaster The broadcaster for whom you want to listen to warnings.
     * @param transport The transport options.
     */
    subscribeToChannelWarningSendEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a VIP being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen for VIP add events for.
     * @param transport The transport options.
     */
    subscribeToChannelVipAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a VIP being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen for VIP remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelVipRemoveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent an extension Bits transaction.
     *
     * @param clientId The Client ID for the extension you want to listen to Bits transactions for.
     * @param transport The transport options.
     */
    subscribeToExtensionBitsTransactionCreateEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user granting authorization to an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization grant events for.
     * @param transport The transport options.
     */
    subscribeToUserAuthorizationGrantEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user revoking their authorization from an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization revoke events for.
     * @param transport The transport options.
     */
    subscribeToUserAuthorizationRevokeEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user updating their account details.
     *
     * @param user The user you want to listen to user update events for.
     * @param transport The transport options.
     * @param withEmail Whether to request adding the email address of the user to the notification.
     *
     * Only has an effect with the websocket transport.
     * With the webhook transport, this depends solely on the previous authorization given by the user.
     */
    subscribeToUserUpdateEvents(user: UserIdResolvable, transport: HelixEventSubTransportOptions, withEmail?: boolean): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user receiving a whisper message from another user.
     *
     * @param user The user you want to listen to whisper message events for.
     * @param transport The transport options.
     */
    subscribeToUserWhisperMessageEvents(user: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a drop entitlement being granted.
     *
     * @expandParams
     *
     * @param filter
     * @param transport The transport options.
     */
    subscribeToDropEntitlementGrantEvents(filter: HelixEventSubDropEntitlementGrantFilter, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a chat message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    subscribeToAutoModMessageHoldEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    subscribeToAutoModMessageUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events (v2) that represent a chat message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    subscribeToAutoModMessageHoldV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events (v2) that represent a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    subscribeToAutoModMessageUpdateV2Events(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent the AutoMod settings being updated.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod settings update events.
     * @param transport The transport options.
     */
    subscribeToAutoModSettingsUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent the AutoMod terms being updated.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod terms update events.
     * @param transport The transport options.
     */
    subscribeToAutoModTermsUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a user's notification about their message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    subscribeToChannelChatUserMessageHoldEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a user's notification about a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    subscribeToChannelChatUserMessageUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a suspicious user updated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen for suspicious user update events.
     * @param transport The transport options.
     */
    subscribeToChannelSuspiciousUserUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events that represent a message sent by a suspicious user.
     *
     * @param broadcaster The broadcaster you want to listen for messages sent by suspicious users.
     * @param transport The transport options.
     */
    subscribeToChannelSuspiciousUserMessageEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events indicating that a shared chat session has begun in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session begin events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    subscribeToChannelSharedChatSessionBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events indicating that a shared chat session has been updated in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session update events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    subscribeToChannelSharedChatSessionUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events indicating that a shared chat session has ended in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session end events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    subscribeToChannelSharedChatSessionEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribes to events indicating that bits are used in a channel.
     *
     * @param broadcaster The broadcaster for whom you want to listen to bits usage events.
     * @param transport The transport options to use for the subscription.
     */
    subscribeToChannelBitsUseEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Gets the current EventSub conduits for the current client.
     *
     */
    getConduits(): Promise<HelixEventSubConduit[]>;
    /**
     * Creates a new EventSub conduit for the current client.
     *
     * @param shardCount The number of shards to create for this conduit.
     */
    createConduit(shardCount: number): Promise<HelixEventSubConduit>;
    /**
     * Updates an EventSub conduit for the current client.
     *
     * @param id The ID of the conduit to update.
     * @param shardCount The number of shards to update for this conduit.
     */
    updateConduit(id: string, shardCount: number): Promise<HelixEventSubConduit>;
    /**
     * Deletes an EventSub conduit for the current client.
     *
     * @param id The ID of the conduit to delete.
     */
    deleteConduit(id: string): Promise<void>;
    /**
     * Gets the shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to get shards for.
     * @param status The status of the shards to filter by.
     * @param pagination
     */
    getConduitShards(conduitId: string, status?: HelixEventSubSubscriptionStatus | undefined, pagination?: HelixPagination): Promise<HelixPaginatedResponse<HelixEventSubConduitShard>>;
    /**
     * Creates a paginator for the shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to get shards for.
     * @param status The status of the shards to filter by.
     */
    getConduitShardsPaginated(conduitId: string, status?: HelixEventSubSubscriptionStatus | undefined): HelixPaginatedRequest<HelixEventSubConduitShardData, HelixEventSubConduitShard>;
    /**
     * Updates shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to update shards for.
     * @param shards List of shards to update
     */
    updateConduitShards(conduitId: string, shards: HelixEventSubConduitShardsOptions[]): Promise<HelixEventSubConduitShard[]>;
    private _deleteSubscriptionsWithCondition;
}
//# sourceMappingURL=HelixEventSubApi.d.ts.map