import { DataObject } from '@twurple/common';
import { type HelixCustomRewardData } from '../../interfaces/endpoints/channelPoints.external.js';
import { type HelixCustomRewardImageScale } from '../../interfaces/endpoints/channelPoints.input.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A custom Channel Points reward.
 */
export declare class HelixCustomReward extends DataObject<HelixCustomRewardData> {
    /**
     * The ID of the reward.
     */
    get id(): string;
    /**
     * The ID of the broadcaster the reward belongs to.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster the reward belongs to.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster the reward belongs to.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the reward's broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * Gets the URL of the image of the reward in the given scale.
     *
     * @param scale The scale of the image.
     */
    getImageUrl(scale: HelixCustomRewardImageScale): string;
    /**
     * The background color of the reward.
     */
    get backgroundColor(): string;
    /**
     * Whether the reward is enabled (shown to users).
     */
    get isEnabled(): boolean;
    /**
     * The channel points cost of the reward.
     */
    get cost(): number;
    /**
     * The title of the reward.
     */
    get title(): string;
    /**
     * The prompt shown to users when redeeming the reward.
     */
    get prompt(): string;
    /**
     * Whether the reward requires user input to be redeemed.
     */
    get userInputRequired(): boolean;
    /**
     * The maximum number of redemptions of the reward per stream. `null` means no limit.
     */
    get maxRedemptionsPerStream(): number | null;
    /**
     * The maximum number of redemptions of the reward per stream for each user. `null` means no limit.
     */
    get maxRedemptionsPerUserPerStream(): number | null;
    /**
     * The cooldown between two redemptions of the reward, in seconds. `null` means no cooldown.
     */
    get globalCooldown(): number | null;
    /**
     * Whether the reward is paused. If true, users can't redeem it.
     */
    get isPaused(): boolean;
    /**
     * Whether the reward is currently in stock.
     */
    get isInStock(): boolean;
    /**
     * How often the reward was already redeemed this stream.
     *
     * Only available when the stream is live and `maxRedemptionsPerStream` is set. Otherwise, this is `null`.
     */
    get redemptionsThisStream(): number | null;
    /**
     * Whether redemptions should automatically be marked as fulfilled.
     */
    get autoFulfill(): boolean;
    /**
     * The time when the cooldown ends. `null` means there is currently no cooldown.
     */
    get cooldownExpiryDate(): Date | null;
}
//# sourceMappingURL=HelixCustomReward.d.ts.map