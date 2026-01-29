import type { HelixUser } from '../user/HelixUser.js';
import { HelixUserSubscription } from './HelixUserSubscription.js';
/**
 * A (paid) subscription of a user to a broadcaster.
 *
 * @inheritDoc
 */
export declare class HelixSubscription extends HelixUserSubscription {
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
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The user ID of the gifter.
     */
    get gifterId(): string | null;
    /**
     * The name of the gifter.
     */
    get gifterName(): string | null;
    /**
     * The display name of the gifter.
     */
    get gifterDisplayName(): string | null;
    /**
     * Gets more information about the gifter.
     */
    getGifter(): Promise<HelixUser | null>;
    /**
     * The user ID of the subscribed user.
     */
    get userId(): string;
    /**
     * The name of the subscribed user.
     */
    get userName(): string;
    /**
     * The display name of the subscribed user.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the subscribed user.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixSubscription.d.ts.map