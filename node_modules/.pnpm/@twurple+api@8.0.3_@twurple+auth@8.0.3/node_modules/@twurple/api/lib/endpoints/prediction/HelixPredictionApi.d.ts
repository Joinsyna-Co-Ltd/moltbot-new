import { type UserIdResolvable } from '@twurple/common';
import { type HelixPredictionData } from '../../interfaces/endpoints/prediction.external.js';
import { type HelixCreatePredictionData } from '../../interfaces/endpoints/prediction.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
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
export declare class HelixPredictionApi extends BaseApi {
    /**
     * Gets a list of predictions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get predictions for.
     * @param pagination
     *
     * @expandParams
     */
    getPredictions(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixPrediction>>;
    /**
     * Creates a paginator for predictions for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get predictions for.
     */
    getPredictionsPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequest<HelixPredictionData, HelixPrediction>;
    /**
     * Gets predictions by IDs.
     *
     * @param broadcaster The broadcaster to get the predictions for.
     * @param ids The IDs of the predictions.
     */
    getPredictionsByIds(broadcaster: UserIdResolvable, ids: string[]): Promise<HelixPrediction[]>;
    /**
     * Gets a prediction by ID.
     *
     * @param broadcaster The broadcaster to get the prediction for.
     * @param id The ID of the prediction.
     */
    getPredictionById(broadcaster: UserIdResolvable, id: string): Promise<HelixPrediction | null>;
    /**
     * Creates a new prediction.
     *
     * @param broadcaster The broadcaster to create the prediction for.
     * @param data
     *
     * @expandParams
     */
    createPrediction(broadcaster: UserIdResolvable, data: HelixCreatePredictionData): Promise<HelixPrediction>;
    /**
     * Locks a prediction.
     *
     * @param broadcaster The broadcaster to lock the prediction for.
     * @param id The ID of the prediction to lock.
     */
    lockPrediction(broadcaster: UserIdResolvable, id: string): Promise<HelixPrediction>;
    /**
     * Resolves a prediction.
     *
     * @param broadcaster The broadcaster to resolve the prediction for.
     * @param id The ID of the prediction to resolve.
     * @param outcomeId The ID of the winning outcome.
     */
    resolvePrediction(broadcaster: UserIdResolvable, id: string, outcomeId: string): Promise<HelixPrediction>;
    /**
     * Cancels a prediction.
     *
     * @param broadcaster The broadcaster to cancel the prediction for.
     * @param id The ID of the prediction to cancel.
     */
    cancelPrediction(broadcaster: UserIdResolvable, id: string): Promise<HelixPrediction>;
    private _endPrediction;
}
//# sourceMappingURL=HelixPredictionApi.d.ts.map