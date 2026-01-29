import { __decorate } from "tslib";
import { HelixExtension, rtfm } from '@twurple/common';
import { createExtensionProductBody, createExtensionTransactionQuery, createReleasedExtensionFilter, } from '../../interfaces/endpoints/extensions.external.js';
import { createSingleKeyQuery } from '../../interfaces/endpoints/generic.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { createPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
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
let HelixExtensionsApi = class HelixExtensionsApi extends BaseApi {
    /**
     * Gets a released extension by ID.
     *
     * @param extensionId The ID of the extension.
     * @param version The version of the extension. If not given, gets the latest version.
     */
    async getReleasedExtension(extensionId, version) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'extensions/released',
            query: createReleasedExtensionFilter(extensionId, version),
        });
        return new HelixExtension(result.data[0]);
    }
    /**
     * Gets a list of channels that are currently live and have the given extension installed.
     *
     * @param extensionId The ID of the extension.
     * @param pagination
     *
     * @expandParams
     */
    async getLiveChannelsWithExtension(extensionId, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'extensions/live',
            query: {
                ...createSingleKeyQuery('extension_id', extensionId),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(result, HelixChannelReference, this._client);
    }
    /**
     * Creates a paginator for channels that are currently live and have the given extension installed.
     *
     * @param extensionId The ID of the extension.
     */
    getLiveChannelsWithExtensionPaginated(extensionId) {
        return new HelixPaginatedRequest({
            url: 'extensions/live',
            query: createSingleKeyQuery('extension_id', extensionId),
        }, this._client, data => new HelixChannelReference(data, this._client));
    }
    /**
     * Gets an extension's Bits products.
     *
     * This only works if the provided token belongs to an extension's client ID,
     * and will return the products for that extension.
     *
     * @param includeDisabled Whether to include disabled/expired products.
     */
    async getExtensionBitsProducts(includeDisabled) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/extensions',
            forceType: 'app',
            query: createSingleKeyQuery('should_include_all', includeDisabled?.toString()),
        });
        return result.data.map(data => new HelixExtensionBitsProduct(data));
    }
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
    async putExtensionBitsProduct(data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/extensions',
            method: 'PUT',
            forceType: 'app',
            jsonBody: createExtensionProductBody(data),
        });
        return new HelixExtensionBitsProduct(result.data[0]);
    }
    /**
     * Gets a list of transactions for the given extension.
     *
     * @param extensionId The ID of the extension to get transactions for.
     * @param filter Additional filters.
     */
    async getExtensionTransactions(extensionId, filter = {}) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'extensions/transactions',
            forceType: 'app',
            query: {
                ...createExtensionTransactionQuery(extensionId, filter),
                ...createPaginationQuery(filter),
            },
        });
        return createPaginatedResult(result, HelixExtensionTransaction, this._client);
    }
    /**
     * Creates a paginator for transactions for the given extension.
     *
     * @param extensionId The ID of the extension to get transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactionsPaginated(extensionId, filter = {}) {
        return new HelixPaginatedRequest({
            url: 'extensions/transactions',
            forceType: 'app',
            query: createExtensionTransactionQuery(extensionId, filter),
        }, this._client, data => new HelixExtensionTransaction(data, this._client));
    }
};
HelixExtensionsApi = __decorate([
    rtfm('api', 'HelixExtensionsApi')
], HelixExtensionsApi);
export { HelixExtensionsApi };
