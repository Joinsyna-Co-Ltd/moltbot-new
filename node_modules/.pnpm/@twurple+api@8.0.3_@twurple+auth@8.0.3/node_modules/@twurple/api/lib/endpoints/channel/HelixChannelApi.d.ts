import { type CommercialLength, type UserIdResolvable } from '@twurple/common';
import { type HelixChannelFollowerData, type HelixFollowedChannelData } from '../../interfaces/endpoints/channel.external.js';
import { type HelixChannelUpdate } from '../../interfaces/endpoints/channel.input.js';
import { type HelixUserRelationData } from '../../interfaces/endpoints/generic.external.js';
import { HelixUserRelation } from '../../relations/HelixUserRelation.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { HelixPaginatedRequestWithTotal } from '../../utils/pagination/HelixPaginatedRequestWithTotal.js';
import { type HelixPaginatedResult, type HelixPaginatedResultWithTotal } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixChannel } from './HelixChannel.js';
import { HelixChannelEditor } from './HelixChannelEditor.js';
import { HelixChannelFollower } from './HelixChannelFollower.js';
import { HelixFollowedChannel } from './HelixFollowedChannel.js';
import { HelixAdSchedule } from './HelixAdSchedule.js';
import { HelixSnoozeNextAdResult } from './HelixSnoozeNextAdResult.js';
/**
 * The Helix API methods that deal with channels.
 *
 * Can be accessed using `client.channels` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const channel = await api.channels.getChannelInfoById('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Channels
 */
export declare class HelixChannelApi extends BaseApi {
    /**
     * Gets the channel data for the given user.
     *
     * @param user The user you want to get channel info for.
     */
    getChannelInfoById(user: UserIdResolvable): Promise<HelixChannel | null>;
    /**
     * Gets the channel data for the given user, batching multiple calls into fewer requests as the API allows.
     *
     * @param user The user you want to get channel info for.
     */
    getChannelInfoByIdBatched(user: UserIdResolvable): Promise<HelixChannel | null>;
    /**
     * Gets the channel data for the given users.
     *
     * @param users The users you want to get channel info for.
     */
    getChannelInfoByIds(users: UserIdResolvable[]): Promise<HelixChannel[]>;
    /**
     * Updates the given user's channel data.
     *
     * @param user The user you want to update channel info for.
     * @param data The channel info to set.
     */
    updateChannelInfo(user: UserIdResolvable, data: HelixChannelUpdate): Promise<void>;
    /**
     * Starts a commercial on a channel.
     *
     * @param broadcaster The broadcaster on whose channel the commercial is started.
     * @param length The length of the commercial, in seconds.
     */
    startChannelCommercial(broadcaster: UserIdResolvable, length: CommercialLength): Promise<void>;
    /**
     * Gets a list of users who have editor permissions on your channel.
     *
     * @param broadcaster The broadcaster to retreive the editors for.
     */
    getChannelEditors(broadcaster: UserIdResolvable): Promise<HelixChannelEditor[]>;
    /**
     * Gets a list of VIPs in a channel.
     *
     * @param broadcaster The owner of the channel to get VIPs for.
     * @param pagination
     *
     * @expandParams
     */
    getVips(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixUserRelation>>;
    /**
     * Creates a paginator for VIPs in a channel.
     *
     * @param broadcaster The owner of the channel to get VIPs for.
     */
    getVipsPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequest<HelixUserRelationData, HelixUserRelation>;
    /**
     * Checks the VIP status of a list of users in a channel.
     *
     * @param broadcaster The owner of the channel to check VIP status in.
     * @param users The users to check.
     */
    checkVipForUsers(broadcaster: UserIdResolvable, users: UserIdResolvable[]): Promise<HelixUserRelation[]>;
    /**
     * Checks the VIP status of a user in a channel.
     *
     * @param broadcaster The owner of the channel to check VIP status in.
     * @param user The user to check.
     */
    checkVipForUser(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<boolean>;
    /**
     * Adds a VIP to the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that’s granting VIP status to the user. This ID must match the user ID in the access token.
     * @param user The user to add as a VIP in the broadcaster’s chat room.
     */
    addVip(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<void>;
    /**
     * Removes a VIP from the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that’s removing VIP status from the user. This ID must match the user ID in the access token.
     * @param user The user to remove as a VIP from the broadcaster’s chat room.
     */
    removeVip(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<void>;
    /**
     * Gets the total number of users that follow the specified broadcaster.
     *
     * @param broadcaster The broadcaster you want to get the number of followers of.
     */
    getChannelFollowerCount(broadcaster: UserIdResolvable): Promise<number>;
    /**
     * Gets a list of users that follow the specified broadcaster.
     * You can also use this endpoint to see whether a specific user follows the broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster you want to get a list of followers for.
     * @param user An optional user to determine if this user follows the broadcaster.
     * If specified, the response contains this user if they follow the broadcaster.
     * If not specified, the response contains all users that follow the broadcaster.
     * @param pagination
     *
     * @expandParams
     */
    getChannelFollowers(broadcaster: UserIdResolvable, user?: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResultWithTotal<HelixChannelFollower>>;
    /**
     * Creates a paginator for users that follow the specified broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster for whom you are getting a list of followers.
     *
     * @expandParams
     */
    getChannelFollowersPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequestWithTotal<HelixChannelFollowerData, HelixChannelFollower>;
    /**
     * Gets a list of broadcasters that the specified user follows.
     * You can also use this endpoint to see whether the user follows a specific broadcaster.
     *
     * @param user The user that's getting a list of followed channels.
     * This ID must match the user ID in the access token.
     * @param broadcaster An optional broadcaster to determine if the user follows this broadcaster.
     * If specified, the response contains this broadcaster if the user follows them.
     * If not specified, the response contains all broadcasters that the user follows.
     * @param pagination
     * @returns
     */
    getFollowedChannels(user: UserIdResolvable, broadcaster?: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResultWithTotal<HelixFollowedChannel>>;
    /**
     * Creates a paginator for broadcasters that the specified user follows.
     *
     * @param user The user that's getting a list of followed channels.
     * The token of this user will be used to get the list of followed channels.
     * @param broadcaster An optional broadcaster to determine if the user follows this broadcaster.
     * If specified, the response contains this broadcaster if the user follows them.
     * If not specified, the response contains all broadcasters that the user follows.
     * @returns
     */
    getFollowedChannelsPaginated(user: UserIdResolvable, broadcaster?: UserIdResolvable): HelixPaginatedRequestWithTotal<HelixFollowedChannelData, HelixFollowedChannel>;
    /**
     * Gets information about the broadcaster's ad schedule.
     *
     * @param broadcaster The broadcaster to get ad schedule information about.
     */
    getAdSchedule(broadcaster: UserIdResolvable): Promise<HelixAdSchedule>;
    /**
     * Snoozes the broadcaster's next ad, if a snooze is available.
     *
     * @param broadcaster The broadcaster to get ad schedule information about.
     */
    snoozeNextAd(broadcaster: UserIdResolvable): Promise<HelixSnoozeNextAdResult>;
}
//# sourceMappingURL=HelixChannelApi.d.ts.map