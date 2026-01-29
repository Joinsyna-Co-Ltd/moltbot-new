import { extractUserId } from '@twurple/common';
/** @internal */
export function createCustomRewardsQuery(broadcaster, onlyManageable) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        only_manageable_rewards: onlyManageable?.toString(),
    };
}
/** @internal */
export function createCustomRewardChangeQuery(broadcaster, rewardId) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        id: rewardId,
    };
}
/** @internal */
export function createCustomRewardBody(data) {
    const result = {
        title: data.title,
        cost: data.cost,
        prompt: data.prompt,
        background_color: data.backgroundColor,
        is_enabled: data.isEnabled,
        is_user_input_required: data.userInputRequired,
        should_redemptions_skip_request_queue: data.autoFulfill,
    };
    if (data.maxRedemptionsPerStream !== undefined) {
        result.is_max_per_stream_enabled = !!data.maxRedemptionsPerStream;
        result.max_per_stream = data.maxRedemptionsPerStream ?? 0;
    }
    if (data.maxRedemptionsPerUserPerStream !== undefined) {
        result.is_max_per_user_per_stream_enabled = !!data.maxRedemptionsPerUserPerStream;
        result.max_per_user_per_stream = data.maxRedemptionsPerUserPerStream ?? 0;
    }
    if (data.globalCooldown !== undefined) {
        result.is_global_cooldown_enabled = !!data.globalCooldown;
        result.global_cooldown_seconds = data.globalCooldown ?? 0;
    }
    if ('isPaused' in data) {
        result.is_paused = data.isPaused;
    }
    return result;
}
/** @internal */
export function createRewardRedemptionsByIdsQuery(broadcaster, rewardId, redemptionIds) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        reward_id: rewardId,
        id: redemptionIds,
    };
}
/** @internal */
export function createRedemptionsForBroadcasterQuery(broadcaster, rewardId, status, filter) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        reward_id: rewardId,
        status,
        sort: filter.newestFirst ? 'NEWEST' : 'OLDEST',
    };
}
