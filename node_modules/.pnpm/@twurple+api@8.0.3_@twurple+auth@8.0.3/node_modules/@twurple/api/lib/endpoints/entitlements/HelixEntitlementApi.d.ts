import { type HelixDropsEntitlementData, type HelixDropsEntitlementFulfillmentStatus, type HelixDropsEntitlementUpdateStatus } from '../../interfaces/endpoints/entitlement.external.js';
import { type HelixDropsEntitlementFilter, type HelixDropsEntitlementPaginatedFilter } from '../../interfaces/endpoints/entitlement.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { BaseApi } from '../BaseApi.js';
import { HelixDropsEntitlement } from './HelixDropsEntitlement.js';
/**
 * The Helix API methods that deal with entitlements (drops).
 *
 * Can be accessed using `client.entitlements` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const clipId = await api.entitlements.getDropsEntitlements();
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Entitlements (Drops)
 */
export declare class HelixEntitlementApi extends BaseApi {
    /**
     * Gets the drops entitlements for the given filter.
     *
     * @expandParams
     *
     * @param filter
     * @param alwaysApp Whether an app token should always be used, even if a user filter is given.
     */
    getDropsEntitlements(filter: HelixDropsEntitlementPaginatedFilter, alwaysApp?: boolean): Promise<HelixPaginatedResult<HelixDropsEntitlement>>;
    /**
     * Creates a paginator for drops entitlements for the given filter.
     *
     * @expandParams
     *
     * @param filter
     * @param alwaysApp Whether an app token should always be used, even if a user filter is given.
     */
    getDropsEntitlementsPaginated(filter: HelixDropsEntitlementFilter, alwaysApp?: boolean): HelixPaginatedRequest<HelixDropsEntitlementData, HelixDropsEntitlement>;
    /**
     * Gets the drops entitlements for the given IDs.
     *
     * @param ids The IDs to fetch.
     */
    getDropsEntitlementsByIds(ids: string[]): Promise<HelixDropsEntitlement[]>;
    /**
     * Gets the drops entitlement for the given ID.
     *
     * @param id The ID to fetch.
     */
    getDropsEntitlementById(id: string): Promise<HelixDropsEntitlement | null>;
    /**
     * Gets the drops entitlement for the given ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param id The ID to fetch.
     */
    getDropsEntitlementByIdBatched(id: string): Promise<HelixDropsEntitlement | null>;
    /**
     * Updates the status of a list of drops entitlements.
     *
     * Returns a map that associates each given ID with its update status.
     *
     * @param ids The IDs of the entitlements.
     * @param fulfillmentStatus The fulfillment status to set the entitlements to.
     */
    updateDropsEntitlements(ids: string[], fulfillmentStatus: HelixDropsEntitlementFulfillmentStatus): Promise<Map<string, HelixDropsEntitlementUpdateStatus>>;
}
//# sourceMappingURL=HelixEntitlementApi.d.ts.map