import { HelixExtension } from '@twurple/common';
import { type HelixChannelReferenceData } from '../../interfaces/endpoints/channel.external.js';
import { type HelixExtensionTransactionData } from '../../interfaces/endpoints/extensions.external.js';
import { type HelixExtensionBitsProductUpdatePayload, type HelixExtensionTransactionsFilter, type HelixExtensionTransactionsPaginatedFilter } from '../../interfaces/endpoints/extensions.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixChannelReference } from '../channel/HelixChannelReference.js';
import { HelixExtensionBitsProduct } from './HelixExtensionBitsProduct.js';
import { HelixExtensionTransaction } from './HelixExtensionTransaction.js';
/**
 * The Helix API methods that deal with extensions.
 *
 * Can be accessed using `client.extensions` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const transactions = await api.extionsions.getExtensionTransactions('abcd');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Extensions
 */
export declare class HelixExtensionsApi extends BaseApi {
    /**
     * Gets a released extension by ID.
     *
     * @param extensionId The ID of the extension.
     * @param version The version of the extension. If not given, gets the latest version.
     */
    getReleasedExtension(extensionId: string, version?: string): Promise<HelixExtension>;
    /**
     * Gets a list of channels that are currently live and have the given extension installed.
     *
     * @param extensionId The ID of the extension.
     * @param pagination
     *
     * @expandParams
     */
    getLiveChannelsWithExtension(extensionId: string, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixChannelReference>>;
    /**
     * Creates a paginator for channels that are currently live and have the given extension installed.
     *
     * @param extensionId The ID of the extension.
     */
    getLiveChannelsWithExtensionPaginated(extensionId: string): HelixPaginatedRequest<HelixChannelReferenceData, HelixChannelReference>;
    /**
     * Gets an extension's Bits products.
     *
     * This only works if the provided token belongs to an extension's client ID,
     * and will return the products for that extension.
     *
     * @param includeDisabled Whether to include disabled/expired products.
     */
    getExtensionBitsProducts(includeDisabled?: boolean): Promise<HelixExtensionBitsProduct[]>;
    /**
     * Creates or updates a Bits product of an extension.
     *
     * This only works if the provided token belongs to an extension's client ID,
     * and will create/update a product for that extension.
     *
     * @param data
     *
     * @expandParams
     */
    putExtensionBitsProduct(data: HelixExtensionBitsProductUpdatePayload): Promise<HelixExtensionBitsProduct>;
    /**
     * Gets a list of transactions for the given extension.
     *
     * @param extensionId The ID of the extension to get transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactions(extensionId: string, filter?: HelixExtensionTransactionsPaginatedFilter): Promise<HelixPaginatedResult<HelixExtensionTransaction>>;
    /**
     * Creates a paginator for transactions for the given extension.
     *
     * @param extensionId The ID of the extension to get transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactionsPaginated(extensionId: string, filter?: HelixExtensionTransactionsFilter): HelixPaginatedRequest<HelixExtensionTransactionData, HelixExtensionTransaction>;
}
//# sourceMappingURL=HelixExtensionsApi.d.ts.map