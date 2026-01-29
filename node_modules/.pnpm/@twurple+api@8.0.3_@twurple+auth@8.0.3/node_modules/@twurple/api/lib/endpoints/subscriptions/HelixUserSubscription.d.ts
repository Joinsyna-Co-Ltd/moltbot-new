import { DataObject } from '@twurple/common';
import { type HelixUserSubscriptionData } from '../../interfaces/endpoints/subscription.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * The user info about a (paid) subscription to a broadcaster.
 */
export declare class HelixUserSubscription extends DataObject<HelixUserSubscriptionData> {
    /**
     * The user ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser | null>;
    /**
     * Whether the subscription has been gifted by another user.
     */
    get isGift(): boolean;
    /**
     * The tier of the subscription.
     */
    get tier(): string;
}
//# sourceMappingURL=HelixUserSubscription.d.ts.map