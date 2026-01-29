import { type UserIdResolvable } from '@twurple/common';
import { type HelixClipData } from '../../interfaces/endpoints/clip.external.js';
import { type HelixClipCreateFromVodParams, type HelixClipCreateParams, type HelixClipFilter, type HelixPaginatedClipFilter } from '../../interfaces/endpoints/clip.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { BaseApi } from '../BaseApi.js';
import { HelixClip } from './HelixClip.js';
/**
 * The Helix API methods that deal with clips.
 *
 * Can be accessed using `client.clips` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const clipId = await api.clips.createClip({ channel: '125328655' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Clips
 */
export declare class HelixClipApi extends BaseApi {
    /**
     * Gets clips for the specified broadcaster in descending order of views.
     *
     * @param broadcaster The broadcaster to fetch clips for.
     * @param filter
     *
     * @expandParams
     */
    getClipsForBroadcaster(broadcaster: UserIdResolvable, filter?: HelixPaginatedClipFilter): Promise<HelixPaginatedResult<HelixClip>>;
    /**
     * Creates a paginator for clips for the specified broadcaster.
     *
     * @param broadcaster The broadcaster to fetch clips for.
     * @param filter
     *
     * @expandParams
     */
    getClipsForBroadcasterPaginated(broadcaster: UserIdResolvable, filter?: HelixClipFilter): HelixPaginatedRequest<HelixClipData, HelixClip>;
    /**
     * Gets clips for the specified game in descending order of views.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    getClipsForGame(gameId: string, filter?: HelixPaginatedClipFilter): Promise<HelixPaginatedResult<HelixClip>>;
    /**
     * Creates a paginator for clips for the specified game.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    getClipsForGamePaginated(gameId: string, filter?: HelixClipFilter): HelixPaginatedRequest<HelixClipData, HelixClip>;
    /**
     * Gets the clips identified by the given IDs.
     *
     * @param ids The clip IDs.
     */
    getClipsByIds(ids: string[]): Promise<HelixClip[]>;
    /**
     * Gets the clip identified by the given ID.
     *
     * @param id The clip ID.
     */
    getClipById(id: string): Promise<HelixClip | null>;
    /**
     * Gets the clip identified by the given ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param id The clip ID.
     */
    getClipByIdBatched(id: string): Promise<HelixClip | null>;
    /**
     * Creates a clip of a running stream.
     *
     * Returns the ID of the clip.
     *
     * @param params
     * @expandParams
     */
    createClip(params: HelixClipCreateParams): Promise<string>;
    /**
     * Creates a clip of a VOD.
     *
     * Returns the ID of the clip.
     *
     * @param params
     * @expandParams
     */
    createClipFromVod(params: HelixClipCreateFromVodParams): Promise<string>;
    private _getClips;
    private _getClipsPaginated;
}
//# sourceMappingURL=HelixClipApi.d.ts.map