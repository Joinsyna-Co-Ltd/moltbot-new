import { mapOptional } from '@d-fischer/shared-utils';
import { extractUserId } from '@twurple/common';
/** @internal */
export function createDropsEntitlementQuery(filters, alwaysApp) {
    return {
        user_id: alwaysApp ? mapOptional(filters.user, extractUserId) : undefined,
        game_id: filters.gameId,
        fulfillment_status: filters.fulfillmentStatus,
    };
}
/** @internal */
export function createDropsEntitlementUpdateBody(ids, fulfillmentStatus) {
    return {
        fulfillment_status: fulfillmentStatus,
        entitlement_ids: ids,
    };
}
