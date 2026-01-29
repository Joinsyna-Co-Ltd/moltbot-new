import { type UserIdResolvable } from '@twurple/common';
import { type HelixCustomRewardRedemptionData, type HelixCustomRewardRedemptionStatus, type HelixCustomRewardRedemptionTargetStatus } from '../../interfaces/endpoints/channelPoints.external.js';
import { type HelixCreateCustomRewardData, type HelixCustomRewardRedemptionFilter, type HelixPaginatedCustomRewardRedemptionFilter, type HelixUpdateCustomRewardData } from '../../interfaces/endpoints/channelPoints.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { BaseApi } from '../BaseApi.js';
import { HelixCustomReward } from './HelixCustomReward.js';
import { HelixCustomRewardRedemption } from './HelixCustomRewardRedemption.js';
/**
 * The Helix API methods that deal with channel points.
 *
 * Can be accessed using `client.channelPoints` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const rewards = await api.channelPoints.getCustomRewards('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Channel points
 */
export declare class HelixChannelPointsApi extends BaseApi {
    /**
     * Gets all custom rewards for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get the rewards for.
     * @param onlyManageable Whether to only get rewards that can be managed by the API.
     */
    getCustomRewards(broadcaster: UserIdResolvable, onlyManageable?: boolean): Promise<HelixCustomReward[]>;
    /**
     * Gets custom rewards by IDs.
     *
     * @param broadcaster The broadcaster to get the rewards for.
     * @param rewardIds The IDs of the rewards.
     */
    getCustomRewardsByIds(broadcaster: UserIdResolvable, rewardIds: string[]): Promise<HelixCustomReward[]>;
    /**
     * Gets a custom reward by ID.
     *
     * @param broadcaster The broadcaster to get the reward for.
     * @param rewardId The ID of the reward.
     */
    getCustomRewardById(broadcaster: UserIdResolvable, rewardId: string): Promise<HelixCustomReward | null>;
    /**
     * Creates a new custom reward.
     *
     * @param broadcaster The broadcaster to create the reward for.
     * @param data The reward data.
     *
     * @expandParams
     */
    createCustomReward(broadcaster: UserIdResolvable, data: HelixCreateCustomRewardData): Promise<HelixCustomReward>;
    /**
     * Updates a custom reward.
     *
     * @param broadcaster The broadcaster to update the reward for.
     * @param rewardId The ID of the reward.
     * @param data The reward data.
     */
    updateCustomReward(broadcaster: UserIdResolvable, rewardId: string, data: HelixUpdateCustomRewardData): Promise<HelixCustomReward>;
    /**
     * Deletes a custom reward.
     *
     * @param broadcaster The broadcaster to delete the reward for.
     * @param rewardId The ID of the reward.
     */
    deleteCustomReward(broadcaster: UserIdResolvable, rewardId: string): Promise<void>;
    /**
     * Gets custom reward redemptions by IDs.
     *
     * @param broadcaster The broadcaster to get the redemptions for.
     * @param rewardId The ID of the reward.
     * @param redemptionIds The IDs of the redemptions.
     */
    getRedemptionsByIds(broadcaster: UserIdResolvable, rewardId: string, redemptionIds: string[]): Promise<HelixCustomRewardRedemption[]>;
    /**
     * Gets a custom reward redemption by ID.
     *
     * @param broadcaster The broadcaster to get the redemption for.
     * @param rewardId The ID of the reward.
     * @param redemptionId The ID of the redemption.
     */
    getRedemptionById(broadcaster: UserIdResolvable, rewardId: string, redemptionId: string): Promise<HelixCustomRewardRedemption | null>;
    /**
     * Gets custom reward redemptions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get the redemptions for.
     * @param rewardId The ID of the reward.
     * @param status The status of the redemptions to get.
     * @param filter
     *
     * @expandParams
     */
    getRedemptionsForBroadcaster(broadcaster: UserIdResolvable, rewardId: string, status: HelixCustomRewardRedemptionStatus, filter: HelixPaginatedCustomRewardRedemptionFilter): Promise<HelixPaginatedResult<HelixCustomRewardRedemption>>;
    /**
     * Creates a paginator for custom reward redemptions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get the redemptions for.
     * @param rewardId The ID of the reward.
     * @param status The status of the redemptions to get.
     * @param filter
     *
     * @expandParams
     */
    getRedemptionsForBroadcasterPaginated(broadcaster: UserIdResolvable, rewardId: string, status: HelixCustomRewardRedemptionStatus, filter: HelixCustomRewardRedemptionFilter): HelixPaginatedRequest<HelixCustomRewardRedemptionData, HelixCustomRewardRedemption>;
    /**
     * Updates the status of the given redemptions by IDs.
     *
     * @param broadcaster The broadcaster to update the redemptions for.
     * @param rewardId The ID of the reward.
     * @param redemptionIds The IDs of the redemptions to update.
     * @param status The status to set for the redemptions.
     */
    updateRedemptionStatusByIds(broadcaster: UserIdResolvable, rewardId: string, redemptionIds: string[], status: HelixCustomRewardRedemptionTargetStatus): Promise<HelixCustomRewardRedemption[]>;
}
//# sourceMappingURL=HelixChannelPointsApi.d.ts.map