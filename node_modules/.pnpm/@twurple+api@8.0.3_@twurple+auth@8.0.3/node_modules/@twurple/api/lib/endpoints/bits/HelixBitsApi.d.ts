import { type UserIdResolvable } from '@twurple/common';
import { type HelixBitsLeaderboardQuery } from '../../interfaces/endpoints/bits.input.js';
import { BaseApi } from '../BaseApi.js';
import { HelixBitsLeaderboard } from './HelixBitsLeaderboard.js';
import { HelixCheermoteList } from './HelixCheermoteList.js';
/**
 * The Helix API methods that deal with bits.
 *
 * Can be accessed using `client.bits` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const leaderboard = await api.bits.getLeaderboard({ period: 'day' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Bits
 */
export declare class HelixBitsApi extends BaseApi {
    /**
     * Gets a bits leaderboard of your channel.
     *
     * @param broadcaster The user to get the leaderboard of.
     * @param params
     * @expandParams
     */
    getLeaderboard(broadcaster: UserIdResolvable, params?: HelixBitsLeaderboardQuery): Promise<HelixBitsLeaderboard>;
    /**
     * Gets all available cheermotes.
     *
     * @param broadcaster The broadcaster to include custom cheermotes of.
     *
     * If not given, only get global cheermotes.
     */
    getCheermotes(broadcaster?: UserIdResolvable): Promise<HelixCheermoteList>;
}
//# sourceMappingURL=HelixBitsApi.d.ts.map