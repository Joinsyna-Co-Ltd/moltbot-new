import { __decorate } from "tslib";
import { mapOptional } from '@d-fischer/shared-utils';
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createBitsLeaderboardQuery, } from '../../interfaces/endpoints/bits.external.js';
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
let HelixBitsApi = class HelixBitsApi extends BaseApi {
    /**
     * Gets a bits leaderboard of your channel.
     *
     * @param broadcaster The user to get the leaderboard of.
     * @param params
     * @expandParams
     */
    async getLeaderboard(broadcaster, params = {}) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/leaderboard',
            userId: extractUserId(broadcaster),
            scopes: ['bits:read'],
            query: createBitsLeaderboardQuery(params),
        });
        return new HelixBitsLeaderboard(result, this._client);
    }
    /**
     * Gets all available cheermotes.
     *
     * @param broadcaster The broadcaster to include custom cheermotes of.
     *
     * If not given, only get global cheermotes.
     */
    async getCheermotes(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/cheermotes',
            userId: mapOptional(broadcaster, extractUserId),
            query: mapOptional(broadcaster, createBroadcasterQuery),
        });
        return new HelixCheermoteList(result.data);
    }
};
HelixBitsApi = __decorate([
    rtfm('api', 'HelixBitsApi')
], HelixBitsApi);
export { HelixBitsApi };
