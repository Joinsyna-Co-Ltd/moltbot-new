import { type UserIdResolvable, type UserNameResolvable } from '@twurple/common';
import { type HelixStreamData, type HelixStreamGetMarkersResponse } from '../../interfaces/endpoints/stream.external.js';
import { type HelixPaginatedStreamFilter, type HelixStreamFilter } from '../../interfaces/endpoints/stream.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination, type HelixPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixStream } from './HelixStream.js';
import { HelixStreamMarker } from './HelixStreamMarker.js';
import { HelixStreamMarkerWithVideo } from './HelixStreamMarkerWithVideo.js';
/**
 * The Helix API methods that deal with streams.
 *
 * Can be accessed using `client.streams` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const stream = await api.streams.getStreamByUserId('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Streams
 */
export declare class HelixStreamApi extends BaseApi {
    /**
     * Gets a list of streams.
     *
     * @param filter
     * @expandParams
     */
    getStreams(filter?: HelixPaginatedStreamFilter): Promise<HelixPaginatedResult<HelixStream>>;
    /**
     * Creates a paginator for streams.
     *
     * @param filter
     * @expandParams
     */
    getStreamsPaginated(filter?: HelixStreamFilter): HelixPaginatedRequest<HelixStreamData, HelixStream>;
    /**
     * Gets the current streams for the given usernames.
     *
     * @param users The username to get the streams for.
     */
    getStreamsByUserNames(users: UserNameResolvable[]): Promise<HelixStream[]>;
    /**
     * Gets the current stream for the given username.
     *
     * @param user The username to get the stream for.
     */
    getStreamByUserName(user: UserNameResolvable): Promise<HelixStream | null>;
    /**
     * Gets the current stream for the given username, batching multiple calls into fewer requests as the API allows.
     *
     * @param user The username to get the stream for.
     */
    getStreamByUserNameBatched(user: UserNameResolvable): Promise<HelixStream | null>;
    /**
     * Gets the current streams for the given user IDs.
     *
     * @param users The user IDs to get the streams for.
     */
    getStreamsByUserIds(users: UserIdResolvable[]): Promise<HelixStream[]>;
    /**
     * Gets the current stream for the given user ID.
     *
     * @param user The user ID to get the stream for.
     */
    getStreamByUserId(user: UserIdResolvable): Promise<HelixStream | null>;
    /**
     * Gets the current stream for the given user ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param user The user ID to get the stream for.
     */
    getStreamByUserIdBatched(user: UserIdResolvable): Promise<HelixStream | null>;
    /**
     * Gets a list of all stream markers for a user.
     *
     * @param user The user to list the stream markers for.
     * @param pagination
     *
     * @expandParams
     */
    getStreamMarkersForUser(user: UserIdResolvable, pagination?: HelixPagination): Promise<HelixPaginatedResult<HelixStreamMarkerWithVideo>>;
    /**
     * Creates a paginator for all stream markers for a user.
     *
     * @param user The user to list the stream markers for.
     */
    getStreamMarkersForUserPaginated(user: UserIdResolvable): HelixPaginatedRequest<HelixStreamGetMarkersResponse, HelixStreamMarkerWithVideo>;
    /**
     * Gets a list of all stream markers for a video.
     *
     * @param user The user the video belongs to.
     * @param videoId The video to list the stream markers for.
     * @param pagination
     *
     * @expandParams
     */
    getStreamMarkersForVideo(user: UserIdResolvable, videoId: string, pagination?: HelixPagination): Promise<HelixPaginatedResult<HelixStreamMarkerWithVideo>>;
    /**
     * Creates a paginator for all stream markers for a video.
     *
     * @param user The user the video belongs to.
     * @param videoId The video to list the stream markers for.
     */
    getStreamMarkersForVideoPaginated(user: UserIdResolvable, videoId: string): HelixPaginatedRequest<HelixStreamGetMarkersResponse, HelixStreamMarkerWithVideo>;
    /**
     * Creates a new stream marker.
     *
     * Only works while the specified user's stream is live.
     *
     * @param broadcaster The broadcaster to create a stream marker for.
     * @param description The description of the marker.
     */
    createStreamMarker(broadcaster: UserIdResolvable, description?: string): Promise<HelixStreamMarker>;
    /**
     * Gets the stream key of a stream.
     *
     * @param broadcaster The broadcaster to get the stream key for.
     */
    getStreamKey(broadcaster: UserIdResolvable): Promise<string>;
    /**
     * Gets the streams that are currently live and are followed by the given user.
     *
     * @param user The user to check followed streams for.
     * @param pagination
     *
     * @expandParams
     */
    getFollowedStreams(user: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixStream>>;
    /**
     * Creates a paginator for the streams that are currently live and are followed by the given user.
     *
     * @param user The user to check followed streams for.
     */
    getFollowedStreamsPaginated(user: UserIdResolvable): HelixPaginatedRequest<HelixStreamData, HelixStream>;
    private static _mapGetStreamMarkersResult;
}
//# sourceMappingURL=HelixStreamApi.d.ts.map