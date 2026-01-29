import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { createSearchChannelsQuery, } from '../../interfaces/endpoints/search.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { createPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixGame } from '../game/HelixGame.js';
import { HelixChannelSearchResult } from './HelixChannelSearchResult.js';
/**
 * The Helix API methods that run searches.
 *
 * Can be accessed using `client.search` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const channels = await api.search.searchChannels('pear');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Search
 */
let HelixSearchApi = class HelixSearchApi extends BaseApi {
    /**
     * Search categories/games for an exact or partial match.
     *
     * @param query The search term.
     * @param pagination
     *
     * @expandParams
     */
    async searchCategories(query, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'search/categories',
            query: {
                query,
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(result, HelixGame, this._client);
    }
    /**
     * Creates a paginator for a category/game search.
     *
     * @param query The search term.
     */
    searchCategoriesPaginated(query) {
        return new HelixPaginatedRequest({
            url: 'search/categories',
            query: {
                query,
            },
        }, this._client, data => new HelixGame(data, this._client));
    }
    /**
     * Search channels for an exact or partial match.
     *
     * @param query The search term.
     * @param filter
     *
     * @expandParams
     */
    async searchChannels(query, filter = {}) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'search/channels',
            query: {
                ...createSearchChannelsQuery(query, filter),
                ...createPaginationQuery(filter),
            },
        });
        return createPaginatedResult(result, HelixChannelSearchResult, this._client);
    }
    /**
     * Creates a paginator for a channel search.
     *
     * @param query The search term.
     * @param filter
     *
     * @expandParams
     */
    searchChannelsPaginated(query, filter = {}) {
        return new HelixPaginatedRequest({
            url: 'search/channels',
            query: createSearchChannelsQuery(query, filter),
        }, this._client, data => new HelixChannelSearchResult(data, this._client));
    }
};
HelixSearchApi = __decorate([
    rtfm('api', 'HelixSearchApi')
], HelixSearchApi);
export { HelixSearchApi };
