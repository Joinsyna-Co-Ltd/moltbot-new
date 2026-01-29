import { HelixPaginatedRequest } from './HelixPaginatedRequest.js';
/**
 * A special case of {@link HelixPaginatedRequest} with support for fetching the total number of entities, whenever an endpoint supports it.
 *
 * @inheritDoc
 */
export declare class HelixPaginatedRequestWithTotal<D, T> extends HelixPaginatedRequest<D, T> {
    /**
     * Gets the total number of entities existing in the queried result set.
     */
    getTotalCount(): Promise<number>;
}
//# sourceMappingURL=HelixPaginatedRequestWithTotal.d.ts.map