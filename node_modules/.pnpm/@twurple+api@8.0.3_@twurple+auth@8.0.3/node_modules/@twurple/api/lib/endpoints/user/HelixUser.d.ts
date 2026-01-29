import { DataObject, type HelixUserType, type UserIdResolvable, type UserIdResolvableType, type UserNameResolveableType } from '@twurple/common';
import { type HelixBroadcasterType, type HelixUserData } from '../../interfaces/endpoints/user.external.js';
import type { HelixPaginatedResultWithTotal } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixChannelFollower } from '../channel/HelixChannelFollower.js';
import { type HelixFollowedChannel } from '../channel/HelixFollowedChannel.js';
import type { HelixStream } from '../stream/HelixStream.js';
import { type HelixSubscription } from '../subscriptions/HelixSubscription.js';
import { type HelixUserSubscription } from '../subscriptions/HelixUserSubscription.js';
/**
 * A Twitch user.
 */
export declare class HelixUser extends DataObject<HelixUserData> implements UserIdResolvableType, UserNameResolveableType {
    /**
     * The ID of the user.
     */
    get id(): string;
    /**
     * The name of the user.
     */
    get name(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * The description of the user.
     */
    get description(): string;
    /**
     * The type of the user.
     */
    get type(): HelixUserType;
    /**
     * The type of the broadcaster.
     */
    get broadcasterType(): HelixBroadcasterType;
    /**
     * The URL of the profile picture of the user.
     */
    get profilePictureUrl(): string;
    /**
     * The URL of the offline video placeholder of the user.
     */
    get offlinePlaceholderUrl(): string;
    /**
     * The date when the user was created, i.e. when they registered on Twitch.
     */
    get creationDate(): Date;
    /**
     * Gets the channel's stream data.
     */
    getStream(): Promise<HelixStream | null>;
    /**
     * Gets a list of broadcasters the user follows.
     */
    getFollowedChannels(): Promise<HelixPaginatedResultWithTotal<HelixFollowedChannel>>;
    /**
     * Gets the follow data of the user to the given broadcaster, or `null` if the user doesn't follow the broadcaster.
     *
     * This requires user authentication.
     * For broadcaster authentication, you can use `getChannelFollower` while switching `this` and the parameter.
     *
     * @param broadcaster The broadcaster to check the follow to.
     */
    getFollowedChannel(broadcaster: UserIdResolvable): Promise<HelixFollowedChannel | null>;
    /**
     * Checks whether the user is following the given broadcaster.
     *
     * This requires user authentication.
     * For broadcaster authentication, you can use `isFollowedBy` while switching `this` and the parameter.
     *
     * @param broadcaster The broadcaster to check the user's follow to.
     */
    follows(broadcaster: UserIdResolvable): Promise<boolean>;
    /**
     * Gets a list of users that follow the broadcaster.
     */
    getChannelFollowers(): Promise<HelixPaginatedResultWithTotal<HelixChannelFollower>>;
    /**
     * Gets the follow data of the given user to the broadcaster, or `null` if the user doesn't follow the broadcaster.
     *
     * This requires broadcaster authentication.
     * For user authentication, you can use `getFollowedChannel` while switching `this` and the parameter.
     *
     * @param user The user to check the follow from.
     */
    getChannelFollower(user: UserIdResolvable): Promise<HelixChannelFollower | null>;
    /**
     * Checks whether the given user is following the broadcaster.
     *
     * This requires broadcaster authentication.
     * For user authentication, you can use `follows` while switching `this` and the parameter.
     *
     * @param user The user to check the broadcaster's follow from.
     */
    isFollowedBy(user: UserIdResolvable): Promise<boolean>;
    /**
     * Gets the subscription data for the user to the given broadcaster, or `null` if the user is not subscribed.
     *
     * This requires user authentication.
     * For broadcaster authentication, you can use `getSubscriber` while switching `this` and the parameter.
     *
     * @param broadcaster The broadcaster you want to get the subscription data for.
     */
    getSubscriptionTo(broadcaster: UserIdResolvable): Promise<HelixUserSubscription | null>;
    /**
     * Checks whether the user is subscribed to the given broadcaster.
     *
     * This requires user authentication.
     * For broadcaster authentication, you can use `hasSubscriber` while switching `this` and the parameter.
     *
     * @param broadcaster The broadcaster you want to check the subscription for.
     */
    isSubscribedTo(broadcaster: UserIdResolvable): Promise<boolean>;
    /**
     * Gets the subscription data for the given user to the broadcaster, or `null` if the user is not subscribed.
     *
     * This requires broadcaster authentication.
     * For user authentication, you can use `getSubscriptionTo` while switching `this` and the parameter.
     *
     * @param user The user you want to get the subscription data for.
     */
    getSubscriber(user: UserIdResolvable): Promise<HelixSubscription | null>;
    /**
     * Checks whether the given user is subscribed to the broadcaster.
     *
     * This requires broadcaster authentication.
     * For user authentication, you can use `isSubscribedTo` while switching `this` and the parameter.
     *
     * @param user The user you want to check the subscription for.
     */
    hasSubscriber(user: UserIdResolvable): Promise<boolean>;
}
//# sourceMappingURL=HelixUser.d.ts.map