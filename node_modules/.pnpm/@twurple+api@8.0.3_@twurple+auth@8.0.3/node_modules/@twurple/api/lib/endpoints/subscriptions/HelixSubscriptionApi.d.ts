import { type UserIdResolvable } from '@twurple/common';
import { type HelixPaginatedSubscriptionsResult } from '../../interfaces/endpoints/subscription.input.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixPaginatedSubscriptionsRequest } from './HelixPaginatedSubscriptionsRequest.js';
import { HelixSubscription } from './HelixSubscription.js';
import { HelixUserSubscription } from './HelixUserSubscription.js';
/**
 * The Helix API methods that deal with subscriptions.
 *
 * Can be accessed using `client.subscriptions` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const subscription = await api.subscriptions.getSubscriptionForUser('61369223', '125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Subscriptions
 */
export declare class HelixSubscriptionApi extends BaseApi {
    /**
     * Gets a list of all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptions(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedSubscriptionsResult>;
    /**
     * Creates a paginator for all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    getSubscriptionsPaginated(broadcaster: UserIdResolvable): HelixPaginatedSubscriptionsRequest;
    /**
     * Gets the subset of the given user list that is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster to find subscriptions to.
     * @param users The users that should be checked for subscriptions.
     */
    getSubscriptionsForUsers(broadcaster: UserIdResolvable, users: UserIdResolvable[]): Promise<HelixSubscription[]>;
    /**
     * Gets the subscription data for a given user to a given broadcaster.
     *
     * This checks with the authorization of a broadcaster.
     * If you only have the authorization of a user, check {@link HelixSubscriptionApi#checkUserSubscription}}.
     *
     * @param broadcaster The broadcaster to check.
     * @param user The user to check.
     */
    getSubscriptionForUser(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<HelixSubscription | null>;
    /**
     * Checks if a given user is subscribed to a given broadcaster. Returns null if not subscribed.
     *
     * This checks with the authorization of a user.
     * If you only have the authorization of a broadcaster, check {@link HelixSubscriptionApi#getSubscriptionForUser}}.
     *
     * @param user The user to check.
     * @param broadcaster The broadcaster to check the user's subscription for.
     */
    checkUserSubscription(user: UserIdResolvable, broadcaster: UserIdResolvable): Promise<HelixUserSubscription | null>;
}
//# sourceMappingURL=HelixSubscriptionApi.d.ts.map