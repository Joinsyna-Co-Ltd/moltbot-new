import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { BaseApi } from '../BaseApi.js';
import { HelixGoal } from './HelixGoal.js';
/**
 * The Helix API methods that deal with creator goals.
 *
 * Can be accessed using `client.goals` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: goals } = await api.helix.goals.getGoals('61369223');
 *
 * @meta category helix
 * @meta categorizedTitle Goals
 */
let HelixGoalApi = class HelixGoalApi extends BaseApi {
    async getGoals(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'goals',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:goals'],
            query: createBroadcasterQuery(broadcaster),
        });
        return result.data.map(data => new HelixGoal(data, this._client));
    }
};
HelixGoalApi = __decorate([
    rtfm('api', 'HelixGoalApi')
], HelixGoalApi);
export { HelixGoalApi };
