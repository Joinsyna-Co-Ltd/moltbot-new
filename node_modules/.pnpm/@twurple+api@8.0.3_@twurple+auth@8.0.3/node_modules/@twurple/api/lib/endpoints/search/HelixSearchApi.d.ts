import { type HelixGameData } from '../../interfaces/endpoints/game.external.js';
import { type HelixChannelSearchResultData } from '../../interfaces/endpoints/search.external.js';
import { type HelixChannelSearchFilter, type HelixPaginatedChannelSearchFilter } from '../../interfaces/endpoints/search.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
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
export declare class HelixSearchApi extends BaseApi {
    /**
     * Search categories/games for an exact or partial match.
     *
     * @param query The search term.
     * @param pagination
     *
     * @expandParams
     */
    searchCategories(query: string, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixGame>>;
    /**
     * Creates a paginator for a category/game search.
     *
     * @param query The search term.
     */
    searchCategoriesPaginated(query: string): HelixPaginatedRequest<HelixGameData, HelixGame>;
    /**
     * Search channels for an exact or partial match.
     *
     * @param query The search term.
     * @param filter
     *
     * @expandParams
     */
    searchChannels(query: string, filter?: HelixPaginatedChannelSearchFilter): Promise<HelixPaginatedResult<HelixChannelSearchResult>>;
    /**
     * Creates a paginator for a channel search.
     *
     * @param query The search term.
     * @param filter
     *
     * @expandParams
     */
    searchChannelsPaginated(query: string, filter?: HelixChannelSearchFilter): HelixPaginatedRequest<HelixChannelSearchResultData, HelixChannelSearchResult>;
}
//# sourceMappingURL=HelixSearchApi.d.ts.map