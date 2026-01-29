import { type UserIdResolvable } from '@twurple/common';
import { BaseApi } from '../BaseApi.js';
import { HelixHypeTrainStatus } from './HelixHypeTrainStatus.js';
/**
 * The Helix API methods that deal with Hype Trains.
 *
 * Can be accessed using `client.hypeTrain` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const hypeTrainStatus = await api.hypeTrain.getHypeTrainStatusForBroadcaster('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Hype Trains
 */
export declare class HelixHypeTrainApi extends BaseApi {
    /**
     * Gets the Hype Train status and statistics for the specified broadcaster.
     *
     * @param broadcaster The broadcaster to fetch Hype Train info for.
     */
    getHypeTrainStatusForBroadcaster(broadcaster: UserIdResolvable): Promise<HelixHypeTrainStatus>;
}
//# sourceMappingURL=HelixHypeTrainApi.d.ts.map