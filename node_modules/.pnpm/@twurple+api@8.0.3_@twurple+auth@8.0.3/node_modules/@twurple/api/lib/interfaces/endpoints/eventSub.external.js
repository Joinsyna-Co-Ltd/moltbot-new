import { extractUserId } from '@twurple/common';
/** @internal */
export function createEventSubBroadcasterCondition(broadcaster) {
    return {
        broadcaster_user_id: extractUserId(broadcaster),
    };
}
/** @internal */
export function createEventSubRewardCondition(broadcaster, rewardId) {
    return { broadcaster_user_id: extractUserId(broadcaster), reward_id: rewardId };
}
/** @internal */
export function createEventSubModeratorCondition(broadcasterId, moderatorId) {
    return {
        broadcaster_user_id: broadcasterId,
        moderator_user_id: moderatorId,
    };
}
/** @internal */
export function createEventSubUserCondition(broadcasterId, userId) {
    return {
        broadcaster_user_id: broadcasterId,
        user_id: userId,
    };
}
/** @internal */
export function createEventSubDropEntitlementGrantCondition(filter) {
    return {
        organization_id: filter.organizationId,
        category_id: filter.categoryId,
        campaign_id: filter.campaignId,
    };
}
/** @internal */
export function createEventSubConduitCondition(conduitId, status) {
    return {
        conduit_id: conduitId,
        status,
    };
}
/** @internal */
export function createEventSubConduitUpdateCondition(conduitId, shardCount) {
    return {
        id: conduitId,
        shard_count: shardCount.toString(),
    };
}
/** @internal */
export function createEventSubConduitShardsUpdateCondition(conduitId, shards) {
    return {
        conduit_id: conduitId,
        shards,
    };
}
