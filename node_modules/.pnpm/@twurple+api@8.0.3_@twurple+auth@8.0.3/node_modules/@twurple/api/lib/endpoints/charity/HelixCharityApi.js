import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixCharityCampaign } from './HelixCharityCampaign.js';
import { HelixCharityCampaignDonation } from './HelixCharityCampaignDonation.js';
/**
 * The Helix API methods that deal with charity campaigns.
 *
 * Can be accessed using `client.charity` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const charityCampaign = await api.charity.getCharityCampaign('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Charity Campaigns
 */
let HelixCharityApi = class HelixCharityApi extends BaseApi {
    /**
     * Gets information about the charity campaign that a broadcaster is running.
     * Returns null if the specified broadcaster has no active charity campaign.
     *
     * @param broadcaster The broadcaster to get charity campaign information about.
     */
    async getCharityCampaign(broadcaster) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'charity/campaigns',
            method: 'GET',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:charity'],
            query: createBroadcasterQuery(broadcaster),
        });
        return new HelixCharityCampaign(response.data[0], this._client);
    }
    /**
     * Gets the list of donations that users have made to the broadcaster’s active charity campaign.
     *
     * @param broadcaster The broadcaster to get charity campaign donation information about.
     * @param pagination
     *
     * @expandParams
     */
    async getCharityCampaignDonations(broadcaster, pagination) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'charity/donations',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:charity'],
            query: {
                ...createBroadcasterQuery(broadcaster),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(response, HelixCharityCampaignDonation, this._client);
    }
};
HelixCharityApi = __decorate([
    rtfm('api', 'HelixCharityApi')
], HelixCharityApi);
export { HelixCharityApi };
