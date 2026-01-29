import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createGetByIdsQuery } from '../../interfaces/endpoints/generic.external.js';
import { createEndPredictionBody, createPredictionBody, } from '../../interfaces/endpoints/prediction.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { createPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixPrediction } from './HelixPrediction.js';
/**
 * The Helix API methods that deal with predictions.
 *
 * Can be accessed using `client.predictions` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: predictions } = await api.helix.predictions.getPredictions('61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Predictions
 */
let HelixPredictionApi = class HelixPredictionApi extends BaseApi {
    /**
     * Gets a list of predictions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get predictions for.
     * @param pagination
     *
     * @expandParams
     */
    async getPredictions(broadcaster, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'predictions',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:predictions'],
            query: {
                ...createBroadcasterQuery(broadcaster),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(result, HelixPrediction, this._client);
    }
    /**
     * Creates a paginator for predictions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get predictions for.
     */
    getPredictionsPaginated(broadcaster) {
        return new HelixPaginatedRequest({
            url: 'predictions',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:predictions'],
            query: createBroadcasterQuery(broadcaster),
        }, this._client, data => new HelixPrediction(data, this._client), 20);
    }
    /**
     * Gets predictions by IDs.
     *
     * @param broadcaster The broadcaster to get the predictions for.
     * @param ids The IDs of the predictions.
     */
    async getPredictionsByIds(broadcaster, ids) {
        if (!ids.length) {
            return [];
        }
        const result = await this._client.callApi({
            type: 'helix',
            url: 'predictions',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:predictions'],
            query: createGetByIdsQuery(broadcaster, ids),
        });
        return result.data.map(data => new HelixPrediction(data, this._client));
    }
    /**
     * Gets a prediction by ID.
     *
     * @param broadcaster The broadcaster to get the prediction for.
     * @param id The ID of the prediction.
     */
    async getPredictionById(broadcaster, id) {
        const predictions = await this.getPredictionsByIds(broadcaster, [id]);
        return predictions.length ? predictions[0] : null;
    }
    /**
     * Creates a new prediction.
     *
     * @param broadcaster The broadcaster to create the prediction for.
     * @param data
     *
     * @expandParams
     */
    async createPrediction(broadcaster, data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'predictions',
            method: 'POST',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:predictions'],
            jsonBody: createPredictionBody(broadcaster, data),
        });
        return new HelixPrediction(result.data[0], this._client);
    }
    /**
     * Locks a prediction.
     *
     * @param broadcaster The broadcaster to lock the prediction for.
     * @param id The ID of the prediction to lock.
     */
    async lockPrediction(broadcaster, id) {
        return await this._endPrediction(broadcaster, id, 'LOCKED');
    }
    /**
     * Resolves a prediction.
     *
     * @param broadcaster The broadcaster to resolve the prediction for.
     * @param id The ID of the prediction to resolve.
     * @param outcomeId The ID of the winning outcome.
     */
    async resolvePrediction(broadcaster, id, outcomeId) {
        return await this._endPrediction(broadcaster, id, 'RESOLVED', outcomeId);
    }
    /**
     * Cancels a prediction.
     *
     * @param broadcaster The broadcaster to cancel the prediction for.
     * @param id The ID of the prediction to cancel.
     */
    async cancelPrediction(broadcaster, id) {
        return await this._endPrediction(broadcaster, id, 'CANCELED');
    }
    async _endPrediction(broadcaster, id, status, outcomeId) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'predictions',
            method: 'PATCH',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:predictions'],
            jsonBody: createEndPredictionBody(broadcaster, id, status, outcomeId),
        });
        return new HelixPrediction(result.data[0], this._client);
    }
};
HelixPredictionApi = __decorate([
    rtfm('api', 'HelixPredictionApi')
], HelixPredictionApi);
export { HelixPredictionApi };
