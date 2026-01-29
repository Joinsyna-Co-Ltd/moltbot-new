import { type UserIdResolvable } from '@twurple/common';
import { type HelixVideoData } from '../../interfaces/endpoints/video.external.js';
import { type HelixPaginatedVideoFilter, type HelixVideoFilter } from '../../interfaces/endpoints/video.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { BaseApi } from '../BaseApi.js';
import { HelixVideo } from './HelixVideo.js';
/**
 * The Helix API methods that deal with videos.
 *
 * Can be accessed using `client.videos` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: videos } = await api.videos.getVideosByUser('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Videos
 */
export declare class HelixVideoApi extends BaseApi {
    /**
     * Gets the video data for the given list of video IDs.
     *
     * @param ids The video IDs you want to look up.
     */
    getVideosByIds(ids: string[]): Promise<HelixVideo[]>;
    /**
     * Gets the video data for the given video ID.
     *
     * @param id The video ID you want to look up.
     */
    getVideoById(id: string): Promise<HelixVideo | null>;
    /**
     * Gets the video data for the given video ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param id The video ID you want to look up.
     */
    getVideoByIdBatched(id: string): Promise<HelixVideo | null>;
    /**
     * Gets the videos of the given user.
     *
     * @param user The user you want to get videos from.
     * @param filter
     *
     * @expandParams
     */
    getVideosByUser(user: UserIdResolvable, filter?: HelixPaginatedVideoFilter): Promise<HelixPaginatedResult<HelixVideo>>;
    /**
     * Creates a paginator for videos of the given user.
     *
     * @param user The user you want to get videos from.
     * @param filter
     *
     * @expandParams
     */
    getVideosByUserPaginated(user: UserIdResolvable, filter?: HelixVideoFilter): HelixPaginatedRequest<HelixVideoData, HelixVideo>;
    /**
     * Gets the videos of the given game.
     *
     * @param gameId The game you want to get videos from.
     * @param filter
     *
     * @expandParams
     */
    getVideosByGame(gameId: string, filter?: HelixPaginatedVideoFilter): Promise<HelixPaginatedResult<HelixVideo>>;
    /**
     * Creates a paginator for videos of the given game.
     *
     * @param gameId The game you want to get videos from.
     * @param filter
     *
     * @expandParams
     */
    getVideosByGamePaginated(gameId: string, filter?: HelixVideoFilter): HelixPaginatedRequest<HelixVideoData, HelixVideo>;
    /**
     * Deletes videos by its IDs.
     *
     * @param broadcaster The broadcaster to delete the videos for.
     * @param ids The IDs of the videos to delete.
     */
    deleteVideosByIds(broadcaster: UserIdResolvable, ids: string[]): Promise<void>;
}
//# sourceMappingURL=HelixVideoApi.d.ts.map