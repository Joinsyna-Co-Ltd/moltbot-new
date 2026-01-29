import { DataObject } from '@twurple/common';
import { type HelixPredictionOutcomeColor, type HelixPredictionOutcomeData } from '../../interfaces/endpoints/prediction.external.js';
import { HelixPredictor } from './HelixPredictor.js';
/**
 * A possible outcome in a channel prediction.
 */
export declare class HelixPredictionOutcome extends DataObject<HelixPredictionOutcomeData> {
    /**
     * The ID of the outcome.
     */
    get id(): string;
    /**
     * The title of the outcome.
     */
    get title(): string;
    /**
     * The number of users that guessed the outcome.
     */
    get users(): number;
    /**
     * The total number of channel points that were spent on guessing the outcome.
     */
    get totalChannelPoints(): number;
    /**
     * The color of the outcome.
     */
    get color(): HelixPredictionOutcomeColor;
    /**
     * The top predictors of the outcome.
     */
    get topPredictors(): HelixPredictor[];
}
//# sourceMappingURL=HelixPredictionOutcome.d.ts.map