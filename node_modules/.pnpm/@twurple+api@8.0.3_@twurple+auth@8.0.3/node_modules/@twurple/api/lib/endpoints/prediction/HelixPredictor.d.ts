import { DataObject } from '@twurple/common';
import { type HelixPredictorData } from '../../interfaces/endpoints/prediction.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A user that took part in a prediction.
 */
export declare class HelixPredictor extends DataObject<HelixPredictorData> {
    /**
     * The user ID of the predictor.
     */
    get userId(): string;
    /**
     * The name of the predictor.
     */
    get userName(): string;
    /**
     * The display name of the predictor.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the predictor.
     */
    getUser(): Promise<HelixUser | null>;
    /**
     * The amount of channel points the predictor used for the prediction.
     */
    get channelPointsUsed(): number;
    /**
     * The amount of channel points the predictor won for the prediction, or null if the prediction is not resolved yet, was cancelled or lost.
     */
    get channelPointsWon(): number | null;
}
//# sourceMappingURL=HelixPredictor.d.ts.map