import { __decorate } from "tslib";
import { mapOptional } from '@d-fischer/shared-utils';
import { extractUserId, rtfm } from '@twurple/common';
import { createEventSubBroadcasterCondition, createEventSubDropEntitlementGrantCondition, createEventSubModeratorCondition, createEventSubRewardCondition, createEventSubUserCondition, createEventSubConduitCondition, createEventSubConduitUpdateCondition, createEventSubConduitShardsUpdateCondition, } from '../../interfaces/endpoints/eventSub.external.js';
import { createSingleKeyQuery } from '../../interfaces/endpoints/generic.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { createPaginatedResultWithTotal, createPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
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
let HelixEventSubApi = class HelixEventSubApi extends BaseApi {
    /**
     * Gets the current EventSub subscriptions for the current client.
     *
     * @param pagination
     *
     * @expandParams
     */
    async getSubscriptions(pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            query: createPaginationQuery(pagination),
        });
        return {
            ...createPaginatedResultWithTotal(result, HelixEventSubSubscription, this._client),
            totalCost: result.total_cost,
            maxTotalCost: result.max_total_cost,
        };
    }
    /**
     * Creates a paginator for the current EventSub subscriptions for the current client.
     */
    getSubscriptionsPaginated() {
        return new HelixPaginatedEventSubSubscriptionsRequest({}, undefined, this._client);
    }
    /**
     * Gets the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    async getSubscriptionsForStatus(status, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            query: {
                ...createPaginationQuery(pagination),
                status,
            },
        });
        return {
            ...createPaginatedResultWithTotal(result, HelixEventSubSubscription, this._client),
            totalCost: result.total_cost,
            maxTotalCost: result.max_total_cost,
        };
    }
    /**
     * Creates a paginator for the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     */
    getSubscriptionsForStatusPaginated(status) {
        return new HelixPaginatedEventSubSubscriptionsRequest({ status }, undefined, this._client);
    }
    /**
     * Gets the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    async getSubscriptionsForType(type, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            query: {
                ...createPaginationQuery(pagination),
                type,
            },
        });
        return {
            ...createPaginatedResultWithTotal(result, HelixEventSubSubscription, this._client),
            totalCost: result.total_cost,
            maxTotalCost: result.max_total_cost,
        };
    }
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     */
    getSubscriptionsForTypePaginated(type) {
        return new HelixPaginatedEventSubSubscriptionsRequest({ type }, undefined, this._client);
    }
    /**
     * Gets the current EventSub subscriptions for the current user and client.
     *
     * @param user The user to get subscriptions for.
     * @param pagination
     *
     * @expandParams
     */
    async getSubscriptionsForUser(user, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            userId: extractUserId(user),
            query: {
                ...createSingleKeyQuery('user_id', extractUserId(user)),
                ...createPaginationQuery(pagination),
            },
        });
        return {
            ...createPaginatedResultWithTotal(result, HelixEventSubSubscription, this._client),
            totalCost: result.total_cost,
            maxTotalCost: result.max_total_cost,
        };
    }
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param user The user to get subscriptions for.
     */
    getSubscriptionsForUserPaginated(user) {
        const userId = extractUserId(user);
        return new HelixPaginatedEventSubSubscriptionsRequest(createSingleKeyQuery('user_id', userId), userId, this._client);
    }
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
    async createSubscription(type, version, condition, transport, user, requiredScopeSet, canOverrideScopedUserContext, isBatched) {
        const usesAppAuth = transport.method === 'webhook' || transport.method === 'conduit';
        const scopes = usesAppAuth ? undefined : requiredScopeSet;
        if (!usesAppAuth && !user) {
            throw new Error(`Transport ${transport.method} can only handle subscriptions with user context`);
        }
        const jsonBody = {
            type,
            version,
            condition,
            transport,
        };
        if (isBatched) {
            jsonBody.is_batching_enabled = true;
        }
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            method: 'POST',
            scopes,
            userId: mapOptional(user, extractUserId),
            canOverrideScopedUserContext,
            forceType: usesAppAuth ? 'app' : 'user',
            jsonBody,
        });
        return new HelixEventSubSubscription(result.data[0], this._client);
    }
    /**
     * Deletes a subscription.
     *
     * @param id The ID of the subscription.
     */
    async deleteSubscription(id) {
        await this._client.callApi({
            type: 'helix',
            url: 'eventsub/subscriptions',
            method: 'DELETE',
            query: {
                id,
            },
        });
    }
    /**
     * Deletes *all* subscriptions.
     */
    async deleteAllSubscriptions() {
        await this._deleteSubscriptionsWithCondition();
    }
    /**
     * Deletes all broken subscriptions, i.e. all that are not enabled or pending verification.
     */
    async deleteBrokenSubscriptions() {
        await this._deleteSubscriptionsWithCondition(sub => sub.status !== 'enabled' && sub.status !== 'webhook_callback_verification_pending');
    }
    /**
     * Subscribe to events that represent a stream going live.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    async subscribeToStreamOnlineEvents(broadcaster, transport) {
        return await this.createSubscription('stream.online', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster);
    }
    /**
     * Subscribe to events that represent a stream going offline.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    async subscribeToStreamOfflineEvents(broadcaster, transport) {
        return await this.createSubscription('stream.offline', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster);
    }
    /**
     * Subscribe to events that represent a channel updating their metadata.
     *
     * @param broadcaster The broadcaster you want to listen to update events for.
     * @param transport The transport options.
     */
    async subscribeToChannelUpdateEvents(broadcaster, transport) {
        return await this.createSubscription('channel.update', '2', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster);
    }
    /**
     * Subscribe to events that represent a user following a channel.
     *
     * @param broadcaster The broadcaster you want to listen to follow events for.
     * @param transport The transport options.
     */
    async subscribeToChannelFollowEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.follow', '2', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcasterId, ['moderator:read:followers'], true);
    }
    /**
     * Subscribe to events that represent a user subscribing to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscribe events for.
     * @param transport The transport options.
     */
    async subscribeToChannelSubscriptionEvents(broadcaster, transport) {
        return await this.createSubscription('channel.subscribe', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:subscriptions']);
    }
    /**
     * Subscribe to events that represent a user gifting another user a subscription to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscription gift events for.
     * @param transport The transport options.
     */
    async subscribeToChannelSubscriptionGiftEvents(broadcaster, transport) {
        return await this.createSubscription('channel.subscription.gift', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:subscriptions']);
    }
    /**
     * Subscribe to events that represent a user's subscription to a channel being announced.
     *
     * @param broadcaster The broadcaster you want to listen to subscription message events for.
     * @param transport The transport options.
     */
    async subscribeToChannelSubscriptionMessageEvents(broadcaster, transport) {
        return await this.createSubscription('channel.subscription.message', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:subscriptions']);
    }
    /**
     * Subscribe to events that represent a user's subscription to a channel ending.
     *
     * @param broadcaster The broadcaster you want to listen to subscription end events for.
     * @param transport The transport options.
     */
    async subscribeToChannelSubscriptionEndEvents(broadcaster, transport) {
        return await this.createSubscription('channel.subscription.end', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:subscriptions']);
    }
    /**
     * Subscribe to events that represent a user cheering bits to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to cheer events for.
     * @param transport The transport options.
     */
    async subscribeToChannelCheerEvents(broadcaster, transport) {
        return await this.createSubscription('channel.cheer', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['bits:read']);
    }
    /**
     * Subscribe to events that represent a charity campaign starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelCharityCampaignStartEvents(broadcaster, transport) {
        return await this.createSubscription('channel.charity_campaign.start', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:charity']);
    }
    /**
     * Subscribe to events that represent a charity campaign ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelCharityCampaignStopEvents(broadcaster, transport) {
        return await this.createSubscription('channel.charity_campaign.stop', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:charity']);
    }
    /**
     * Subscribe to events that represent a user donating to a charity campaign in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelCharityDonationEvents(broadcaster, transport) {
        return await this.createSubscription('channel.charity_campaign.donate', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:charity']);
    }
    /**
     * Subscribe to events that represent a charity campaign progressing in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelCharityCampaignProgressEvents(broadcaster, transport) {
        return await this.createSubscription('channel.charity_campaign.progress', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:charity']);
    }
    /**
     * Subscribe to events that represent a user being banned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to ban events for.
     * @param transport The transport options.
     */
    async subscribeToChannelBanEvents(broadcaster, transport) {
        return await this.createSubscription('channel.ban', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:moderate']);
    }
    /**
     * Subscribe to events that represent a user being unbanned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to unban events for.
     * @param transport The transport options.
     */
    async subscribeToChannelUnbanEvents(broadcaster, transport) {
        return await this.createSubscription('channel.unban', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:moderate']);
    }
    /**
     * Subscribe to events that represent Shield Mode being activated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode activation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelShieldModeBeginEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shield_mode.begin', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcasterId, ['moderator:read:shield_mode', 'moderator:manage:shield_mode'], true);
    }
    /**
     * Subscribe to events that represent Shield Mode being deactivated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode deactivation events for.
     * @param transport The transport options.
     */
    async subscribeToChannelShieldModeEndEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shield_mode.end', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcasterId, ['moderator:read:shield_mode', 'moderator:manage:shield_mode'], true);
    }
    /**
     * Subscribe to events that represent a moderator being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator add events for.
     * @param transport The transport options.
     */
    async subscribeToChannelModeratorAddEvents(broadcaster, transport) {
        return await this.createSubscription('channel.moderator.add', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['moderation:read']);
    }
    /**
     * Subscribe to events that represent a moderator being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator remove events for.
     * @param transport The transport options.
     */
    async subscribeToChannelModeratorRemoveEvents(broadcaster, transport) {
        return await this.createSubscription('channel.moderator.remove', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['moderation:read']);
    }
    /**
     * Subscribe to events that represent a broadcaster raiding another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to outgoing raid events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRaidEventsFrom(broadcaster, transport) {
        return await this.createSubscription('channel.raid', '1', createSingleKeyQuery('from_broadcaster_user_id', extractUserId(broadcaster)), transport, broadcaster);
    }
    /**
     * Subscribe to events that represent a broadcaster being raided by another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to incoming raid events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRaidEventsTo(broadcaster, transport) {
        return await this.createSubscription('channel.raid', '1', createSingleKeyQuery('to_broadcaster_user_id', extractUserId(broadcaster)), transport, broadcaster);
    }
    /**
     * Subscribe to events that represent a Channel Points reward being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward add events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRewardAddEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward.add', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points reward being updated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRewardUpdateEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward.update', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a specific Channel Points reward being updated.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param rewardId The ID of the reward you want to listen to update events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRewardUpdateEventsForReward(broadcaster, rewardId, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward.update', '1', createEventSubRewardCondition(broadcaster, rewardId), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRewardRemoveEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward.remove', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a specific Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param rewardId The ID of the reward you want to listen to remove events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRewardRemoveEventsForReward(broadcaster, rewardId, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward.remove', '1', createEventSubRewardCondition(broadcaster, rewardId), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRedemptionAddEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward_redemption.add', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a specific Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param rewardId The ID of the reward you want to listen to redemption events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRedemptionAddEventsForReward(broadcaster, rewardId, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward_redemption.add', '1', createEventSubRewardCondition(broadcaster, rewardId), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param transport The transport options.
     */
    async subscribeToChannelRedemptionUpdateEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward_redemption.update', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a specific Channel Points reward's redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param rewardId The ID of the reward you want to listen to redemption updates for.
     * @param transport The transport options.
     */
    async subscribeToChannelRedemptionUpdateEventsForReward(broadcaster, rewardId, transport) {
        return await this.createSubscription('channel.channel_points_custom_reward_redemption.update', '1', createEventSubRewardCondition(broadcaster, rewardId), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points automatic reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to automatic reward redemption events for.
     * @param transport The transport options.
     */
    async subscribeToChannelAutomaticRewardRedemptionAddEvents(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_automatic_reward_redemption.add', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a Channel Points automatic reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to automatic reward redemption events for.
     * @param transport The transport options.
     */
    async subscribeToChannelAutomaticRewardRedemptionAddV2Events(broadcaster, transport) {
        return await this.createSubscription('channel.channel_points_automatic_reward_redemption.add', '2', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:redemptions', 'channel:manage:redemptions']);
    }
    /**
     * Subscribe to events that represent a poll starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll begin events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPollBeginEvents(broadcaster, transport) {
        return await this.createSubscription('channel.poll.begin', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:polls', 'channel:manage:polls']);
    }
    /**
     * Subscribe to events that represent a poll being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll progress events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPollProgressEvents(broadcaster, transport) {
        return await this.createSubscription('channel.poll.progress', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:polls', 'channel:manage:polls']);
    }
    /**
     * Subscribe to events that represent a poll ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll end events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPollEndEvents(broadcaster, transport) {
        return await this.createSubscription('channel.poll.end', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:polls', 'channel:manage:polls']);
    }
    /**
     * Subscribe to events that represent a prediction starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction begin events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPredictionBeginEvents(broadcaster, transport) {
        return await this.createSubscription('channel.prediction.begin', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:predictions', 'channel:manage:predictions']);
    }
    /**
     * Subscribe to events that represent a prediction being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction preogress events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPredictionProgressEvents(broadcaster, transport) {
        return await this.createSubscription('channel.prediction.progress', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:predictions', 'channel:manage:predictions']);
    }
    /**
     * Subscribe to events that represent a prediction being locked in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction lock events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPredictionLockEvents(broadcaster, transport) {
        return await this.createSubscription('channel.prediction.lock', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:predictions', 'channel:manage:predictions']);
    }
    /**
     * Subscribe to events that represent a prediction ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction end events for.
     * @param transport The transport options.
     */
    async subscribeToChannelPredictionEndEvents(broadcaster, transport) {
        return await this.createSubscription('channel.prediction.end', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:predictions', 'channel:manage:predictions']);
    }
    /**
     * Subscribe to events that represent the beginning of a creator goal event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to goal begin events for.
     * @param transport The transport options.
     */
    async subscribeToChannelGoalBeginEvents(broadcaster, transport) {
        return await this.createSubscription('channel.goal.begin', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:goals']);
    }
    /**
     * Subscribe to events that represent progress towards a creator goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal progress events.
     * @param transport The transport options.
     */
    async subscribeToChannelGoalProgressEvents(broadcaster, transport) {
        return await this.createSubscription('channel.goal.progress', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:goals']);
    }
    /**
     * Subscribe to events that represent the end of a creator goal event.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal end events.
     * @param transport The transport options.
     */
    async subscribeToChannelGoalEndEvents(broadcaster, transport) {
        return await this.createSubscription('channel.goal.end', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:goals']);
    }
    /**
     * Subscribe to events that represent the beginning of a Hype Train event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Hype train begin events for.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainBeginEvents(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.begin', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent progress towards the Hype Train goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train progress events.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainProgressEvents(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.progress', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent the end of a Hype Train event.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train end events.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainEndEvents(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.end', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent the beginning of a Hype Train event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Hype train begin events for.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainBeginV2Events(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.begin', '2', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent progress towards the Hype Train goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train progress events.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainProgressV2Events(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.progress', '2', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent the end of a Hype Train event.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train end events.
     * @param transport The transport options.
     */
    async subscribeToChannelHypeTrainEndV2Events(broadcaster, transport) {
        return await this.createSubscription('channel.hype_train.end', '2', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:hype_train']);
    }
    /**
     * Subscribe to events that represent a broadcaster shouting out another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to outgoing shoutout events.
     * @param transport The transport options.
     */
    async subscribeToChannelShoutoutCreateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shoutout.create', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcasterId, ['moderator:read:shoutouts', 'moderator:manage:shoutouts'], true);
    }
    /**
     * Subscribe to events that represent a broadcaster being shouting out by another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to incoming shoutout events.
     * @param transport The transport options.
     */
    async subscribeToChannelShoutoutReceiveEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shoutout.receive', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcasterId, ['moderator:read:shoutouts', 'moderator:manage:shoutouts'], true);
    }
    /**
     * Subscribe to events that represent an ad break beginning in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to ad break begin events.
     * @param transport The transport options.
     */
    async subscribeToChannelAdBreakBeginEvents(broadcaster, transport) {
        return await this.createSubscription('channel.ad_break.begin', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:ads']);
    }
    /**
     * Subscribe to events that represent a channel's chat being cleared.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat clear events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatClearEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.clear', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent a user's chat messages being cleared in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to user chat message clear events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatClearUserMessagesEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.clear_user_messages', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent a chat message being deleted in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat message delete events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatMessageDeleteEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.message_delete', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent a chat notification in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat notification events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatNotificationEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.notification', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent a chat message in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat message events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatMessageEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.message', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent chat settings being updated in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat settings update events.
     * @param transport The transport options.
     */
    async subscribeToChannelChatSettingsUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat_settings.update', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribe to events that represent a created unban requests in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to unban requests.
     * @param transport The transport options.
     */
    async subscribeToChannelUnbanRequestCreateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.unban_request.create', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:unban_requests', 'moderator:manage:unban_requests'], true);
    }
    /**
     * Subscribe to events that represent a resolved unban requests in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to unban requests.
     * @param transport The transport options.
     */
    async subscribeToChannelUnbanRequestResolveEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.unban_request.resolve', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:unban_requests', 'moderator:manage:unban_requests'], true);
    }
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
    async subscribeToChannelModerateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.moderate', '2', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, [], true);
    }
    /**
     * Subscribe to events that represent a warning being acknowledged by a user.
     *
     * @param broadcaster The broadcaster for whom you want to listen to warnings.
     * @param transport The transport options.
     */
    async subscribeToChannelWarningAcknowledgeEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.warning.acknowledge', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:warnings', 'moderator:manage:warnings'], true);
    }
    /**
     * Subscribe to events that represent a warning sent to a user.
     *
     * @param broadcaster The broadcaster for whom you want to listen to warnings.
     * @param transport The transport options.
     */
    async subscribeToChannelWarningSendEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.warning.send', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:warnings', 'moderator:manage:warnings'], true);
    }
    /**
     * Subscribe to events that represent a VIP being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen for VIP add events for.
     * @param transport The transport options.
     */
    async subscribeToChannelVipAddEvents(broadcaster, transport) {
        return await this.createSubscription('channel.vip.add', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:vips', 'channel:manage:vips']);
    }
    /**
     * Subscribe to events that represent a VIP being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen for VIP remove events for.
     * @param transport The transport options.
     */
    async subscribeToChannelVipRemoveEvents(broadcaster, transport) {
        return await this.createSubscription('channel.vip.remove', '1', createEventSubBroadcasterCondition(broadcaster), transport, broadcaster, ['channel:read:vips', 'channel:manage:vips']);
    }
    /**
     * Subscribe to events that represent an extension Bits transaction.
     *
     * @param clientId The Client ID for the extension you want to listen to Bits transactions for.
     * @param transport The transport options.
     */
    async subscribeToExtensionBitsTransactionCreateEvents(clientId, transport) {
        return await this.createSubscription('extension.bits_transaction.create', '1', createSingleKeyQuery('extension_client_id', clientId), transport);
    }
    /**
     * Subscribe to events that represent a user granting authorization to an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization grant events for.
     * @param transport The transport options.
     */
    async subscribeToUserAuthorizationGrantEvents(clientId, transport) {
        return await this.createSubscription('user.authorization.grant', '1', createSingleKeyQuery('client_id', clientId), transport);
    }
    /**
     * Subscribe to events that represent a user revoking their authorization from an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization revoke events for.
     * @param transport The transport options.
     */
    async subscribeToUserAuthorizationRevokeEvents(clientId, transport) {
        return await this.createSubscription('user.authorization.revoke', '1', createSingleKeyQuery('client_id', clientId), transport);
    }
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
    async subscribeToUserUpdateEvents(user, transport, withEmail) {
        return await this.createSubscription('user.update', '1', createSingleKeyQuery('user_id', extractUserId(user)), transport, user, withEmail ? ['user:read:email'] : undefined);
    }
    /**
     * Subscribe to events that represent a user receiving a whisper message from another user.
     *
     * @param user The user you want to listen to whisper message events for.
     * @param transport The transport options.
     */
    async subscribeToUserWhisperMessageEvents(user, transport) {
        return await this.createSubscription('user.whisper.message', '1', createSingleKeyQuery('user_id', extractUserId(user)), transport, user, ['user:read:whispers', 'user:manage:whispers']);
    }
    /**
     * Subscribe to events that represent a drop entitlement being granted.
     *
     * @expandParams
     *
     * @param filter
     * @param transport The transport options.
     */
    async subscribeToDropEntitlementGrantEvents(filter, transport) {
        return await this.createSubscription('drop.entitlement.grant', '1', createEventSubDropEntitlementGrantCondition(filter), transport, undefined, undefined, false, true);
    }
    /**
     * Subscribes to events that represent a chat message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    async subscribeToAutoModMessageHoldEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.message.hold', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:manage:automod'], true);
    }
    /**
     * Subscribes to events that represent a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    async subscribeToAutoModMessageUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.message.update', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:manage:automod'], true);
    }
    /**
     * Subscribes to events (v2) that represent a chat message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    async subscribeToAutoModMessageHoldV2Events(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.message.hold', '2', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:manage:automod'], true);
    }
    /**
     * Subscribes to events (v2) that represent a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    async subscribeToAutoModMessageUpdateV2Events(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.message.update', '2', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:manage:automod'], true);
    }
    /**
     * Subscribes to events that represent the AutoMod settings being updated.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod settings update events.
     * @param transport The transport options.
     */
    async subscribeToAutoModSettingsUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.settings.update', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:automod_settings'], true);
    }
    /**
     * Subscribes to events that represent the AutoMod terms being updated.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod terms update events.
     * @param transport The transport options.
     */
    async subscribeToAutoModTermsUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('automod.terms.update', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:manage:automod'], true);
    }
    /**
     * Subscribes to events that represent a user's notification about their message being held by AutoMod.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message hold events for.
     * @param transport The transport options.
     */
    async subscribeToChannelChatUserMessageHoldEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.user_message_hold', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribes to events that represent a user's notification about a held chat message by AutoMod being resolved.
     *
     * @param broadcaster The broadcaster you want to listen to AutoMod message resolution events for.
     * @param transport The transport options.
     */
    async subscribeToChannelChatUserMessageUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.chat.user_message_update', '1', createEventSubUserCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['user:read:chat'], true);
    }
    /**
     * Subscribes to events that represent a suspicious user updated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen for suspicious user update events.
     * @param transport The transport options.
     */
    async subscribeToChannelSuspiciousUserUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.suspicious_user.update', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:suspicious_users'], true);
    }
    /**
     * Subscribes to events that represent a message sent by a suspicious user.
     *
     * @param broadcaster The broadcaster you want to listen for messages sent by suspicious users.
     * @param transport The transport options.
     */
    async subscribeToChannelSuspiciousUserMessageEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.suspicious_user.message', '1', createEventSubModeratorCondition(broadcasterId, this._getUserContextIdWithDefault(broadcasterId)), transport, broadcaster, ['moderator:read:suspicious_users'], true);
    }
    /**
     * Subscribes to events indicating that a shared chat session has begun in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session begin events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    async subscribeToChannelSharedChatSessionBeginEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shared_chat.begin', '1', createEventSubBroadcasterCondition(broadcasterId), transport, broadcasterId);
    }
    /**
     * Subscribes to events indicating that a shared chat session has been updated in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session update events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    async subscribeToChannelSharedChatSessionUpdateEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shared_chat.update', '1', createEventSubBroadcasterCondition(broadcasterId), transport, broadcasterId);
    }
    /**
     * Subscribes to events indicating that a shared chat session has ended in a channel.
     *
     * @param broadcaster The broadcaster for whom shared chat session end events should be listened to.
     * @param transport The transport options to use for the subscription.
     */
    async subscribeToChannelSharedChatSessionEndEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.shared_chat.end', '1', createEventSubBroadcasterCondition(broadcasterId), transport, broadcasterId);
    }
    /**
     * Subscribes to events indicating that bits are used in a channel.
     *
     * @param broadcaster The broadcaster for whom you want to listen to bits usage events.
     * @param transport The transport options to use for the subscription.
     */
    async subscribeToChannelBitsUseEvents(broadcaster, transport) {
        const broadcasterId = extractUserId(broadcaster);
        return await this.createSubscription('channel.bits.use', '1', createEventSubBroadcasterCondition(broadcasterId), transport, broadcasterId, ['bits:read']);
    }
    /**
     * Gets the current EventSub conduits for the current client.
     *
     */
    async getConduits() {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits',
        });
        return result.data.map(data => new HelixEventSubConduit(data, this._client));
    }
    /**
     * Creates a new EventSub conduit for the current client.
     *
     * @param shardCount The number of shards to create for this conduit.
     */
    async createConduit(shardCount) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits',
            method: 'POST',
            query: {
                ...createSingleKeyQuery('shard_count', shardCount.toString()),
            },
        });
        return new HelixEventSubConduit(result.data[0], this._client);
    }
    /**
     * Updates an EventSub conduit for the current client.
     *
     * @param id The ID of the conduit to update.
     * @param shardCount The number of shards to update for this conduit.
     */
    async updateConduit(id, shardCount) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits',
            method: 'PATCH',
            query: createEventSubConduitUpdateCondition(id, shardCount),
        });
        return new HelixEventSubConduit(result.data[0], this._client);
    }
    /**
     * Deletes an EventSub conduit for the current client.
     *
     * @param id The ID of the conduit to delete.
     */
    async deleteConduit(id) {
        await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits',
            method: 'DELETE',
            query: {
                ...createSingleKeyQuery('id', id),
            },
        });
    }
    /**
     * Gets the shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to get shards for.
     * @param status The status of the shards to filter by.
     * @param pagination
     */
    async getConduitShards(conduitId, status, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits/shards',
            query: {
                ...createEventSubConduitCondition(conduitId, status),
                ...createPaginationQuery(pagination),
            },
        });
        return {
            ...createPaginatedResult(result, HelixEventSubConduitShard, this._client),
        };
    }
    /**
     * Creates a paginator for the shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to get shards for.
     * @param status The status of the shards to filter by.
     */
    getConduitShardsPaginated(conduitId, status) {
        return new HelixPaginatedRequest({
            url: 'eventsub/conduits/shards',
            query: createEventSubConduitCondition(conduitId, status),
        }, this._client, data => new HelixEventSubConduitShard(data));
    }
    /**
     * Updates shards of an EventSub conduit for the current client.
     *
     * @param conduitId The ID of the conduit to update shards for.
     * @param shards List of shards to update
     */
    async updateConduitShards(conduitId, shards) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'eventsub/conduits/shards',
            method: 'PATCH',
            jsonBody: createEventSubConduitShardsUpdateCondition(conduitId, shards),
        });
        return result.data.map(data => new HelixEventSubConduitShard(data));
    }
    async _deleteSubscriptionsWithCondition(cond) {
        const subsPaginator = this.getSubscriptionsPaginated();
        for await (const sub of subsPaginator) {
            if (!cond || cond(sub)) {
                await sub.unsubscribe();
            }
        }
    }
};
HelixEventSubApi = __decorate([
    rtfm('api', 'HelixEventSubApi')
], HelixEventSubApi);
export { HelixEventSubApi };
