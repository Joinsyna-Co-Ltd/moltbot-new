import { DataObject } from '@twurple/common';
import { type HelixGameData } from '../../interfaces/endpoints/game.external.js';
import { type HelixStreamData } from '../../interfaces/endpoints/stream.external.js';
import type { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import type { HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import type { HelixPagination } from '../../utils/pagination/HelixPagination.js';
import type { HelixStream } from '../stream/HelixStream.js';
/**
 * A game as displayed on Twitch.
 */
export declare class HelixGame extends DataObject<HelixGameData> {
    /**
     * The ID of the game.
     */
    get id(): string;
    /**
     * The name of the game.
     */
    get name(): string;
    /**
     * The URL of the box art of the game.
     */
    get boxArtUrl(): string;
    /**
     * The IGDB ID of the game, or null if the game doesn't have an IGDB ID assigned at Twitch.
     */
    get igdbId(): string | null;
    /**
     * Builds the URL of the box art of the game using the given dimensions.
     *
     * @param width The width of the box art.
     * @param height The height of the box art.
     */
    getBoxArtUrl(width: number, height: number): string;
    /**
     * Gets streams that are currently playing the game.
     *
     * @param pagination
     * @expandParams
     */
    getStreams(pagination?: HelixPagination): Promise<HelixPaginatedResult<HelixStream>>;
    /**
     * Creates a paginator for streams that are currently playing the game.
     */
    getStreamsPaginated(): HelixPaginatedRequest<HelixStreamData, HelixStream>;
}
//# sourceMappingURL=HelixGame.d.ts.map