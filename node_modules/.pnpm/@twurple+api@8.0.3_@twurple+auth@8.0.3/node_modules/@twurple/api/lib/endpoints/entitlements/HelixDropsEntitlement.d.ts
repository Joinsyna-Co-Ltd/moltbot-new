import { DataObject } from '@twurple/common';
import { type HelixDropsEntitlementData, type HelixDropsEntitlementFulfillmentStatus } from '../../interfaces/endpoints/entitlement.external.js';
import { type HelixGame } from '../game/HelixGame.js';
import { type HelixUser } from '../user/HelixUser.js';
/**
 * An entitlement for a drop.
 */
export declare class HelixDropsEntitlement extends DataObject<HelixDropsEntitlementData> {
    /**
     * The ID of the entitlement.
     */
    get id(): string;
    /**
     * The ID of the reward.
     */
    get rewardId(): string;
    /**
     * The date when the entitlement was granted.
     */
    get grantDate(): Date;
    /**
     * The ID of the entitled user.
     */
    get userId(): string;
    /**
     * Gets more information about the entitled user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The ID of the game the entitlement was granted for.
     */
    get gameId(): string;
    /**
     * Gets more information about the game the entitlement was granted for.
     */
    getGame(): Promise<HelixGame>;
    /**
     * The fulfillment status of the entitlement.
     */
    get fulfillmentStatus(): HelixDropsEntitlementFulfillmentStatus;
    /**
     * The date when the entitlement was last updated.
     */
    get updateDate(): Date;
}
//# sourceMappingURL=HelixDropsEntitlement.d.ts.map