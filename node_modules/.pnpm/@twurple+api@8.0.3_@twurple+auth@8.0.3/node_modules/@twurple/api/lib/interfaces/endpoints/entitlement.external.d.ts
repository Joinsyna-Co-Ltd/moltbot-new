/**
 * The fulfillment status of a drop entitlement.
 */
export type HelixDropsEntitlementFulfillmentStatus = 'CLAIMED' | 'FULFILLED';
/**
 * The update status of a drop entitlement.
 */
export type HelixDropsEntitlementUpdateStatus = 'INVALID_ID' | 'NOT_FOUND' | 'SUCCESS' | 'UNAUTHORIZED' | 'UPDATE_FAILED';
/** @private */
export interface HelixDropsEntitlementData {
    id: string;
    benefit_id: string;
    timestamp: string;
    user_id: string;
    game_id: string;
    fulfillment_status: HelixDropsEntitlementFulfillmentStatus;
    last_updated: string;
}
/** @private */
export interface HelixDropsEntitlementUpdateData {
    status: HelixDropsEntitlementUpdateStatus;
    ids: string[];
}
//# sourceMappingURL=entitlement.external.d.ts.map