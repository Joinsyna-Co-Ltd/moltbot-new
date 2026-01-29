import { type HelixGameData } from '../../interfaces/endpoints/game.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixGame } from './HelixGame.js';
/**
 * The Helix API methods that deal with games.
 *
 * Can be accessed using `client.games` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const game = await api.games.getGameByName('Hearthstone');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Games
 */
export declare class HelixGameApi extends BaseApi {
    /**
     * Gets the game data for the given list of game IDs.
     *
     * @param ids The game IDs you want to look up.
     */
    getGamesByIds(ids: string[]): Promise<HelixGame[]>;
    /**
     * Gets the game data for the given list of game names.
     *
     * @param names The game names you want to look up.
     */
    getGamesByNames(names: string[]): Promise<HelixGame[]>;
    /**
     * Gets the game data for the given list of IGDB IDs.
     *
     * @param igdbIds The IGDB IDs you want to look up.
     */
    getGamesByIgdbIds(igdbIds: string[]): Promise<HelixGame[]>;
    /**
     * Gets the game data for the given game ID.
     *
     * @param id The game ID you want to look up.
     */
    getGameById(id: string): Promise<HelixGame | null>;
    /**
     * Gets the game data for the given game name.
     *
     * @param name The game name you want to look up.
     */
    getGameByName(name: string): Promise<HelixGame | null>;
    /**
     * Gets the game data for the given IGDB ID.
     *
     * @param igdbId The IGDB ID you want to look up.
     */
    getGameByIgdbId(igdbId: string): Promise<HelixGame | null>;
    /**
     * Gets the game data for the given game ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param id The game ID you want to look up.
     */
    getGameByIdBatched(id: string): Promise<HelixGame | null>;
    /**
     * Gets the game data for the given game name, batching multiple calls into fewer requests as the API allows.
     *
     * @param name The game name you want to look up.
     */
    getGameByNameBatched(name: string): Promise<HelixGame | null>;
    /**
     * Gets the game data for the given IGDB ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param igdbId The IGDB ID you want to look up.
     */
    getGameByIgdbIdBatched(igdbId: string): Promise<HelixGame | null>;
    /**
     * Gets a list of the most viewed games at the moment.
     *
     * @param pagination
     *
     * @expandParams
     */
    getTopGames(pagination?: HelixPagination): Promise<HelixPaginatedResult<HelixGame>>;
    /**
     * Creates a paginator for the most viewed games at the moment.
     */
    getTopGamesPaginated(): HelixPaginatedRequest<HelixGameData, HelixGame>;
}
//# sourceMappingURL=HelixGameApi.d.ts.map