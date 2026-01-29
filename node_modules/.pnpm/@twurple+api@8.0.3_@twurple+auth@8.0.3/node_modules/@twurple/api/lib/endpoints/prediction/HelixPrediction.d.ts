import { DataObject } from '@twurple/common';
import { type HelixPredictionData, type HelixPredictionStatus } from '../../interfaces/endpoints/prediction.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixPredictionOutcome } from './HelixPredictionOutcome.js';
/**
 * A channel prediction.
 */
export declare class HelixPrediction extends DataObject<HelixPredictionData> {
    /**
     * The ID of the prediction.
     */
    get id(): string;
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The title of the prediction.
     */
    get title(): string;
    /**
     * The status of the prediction.
     */
    get status(): HelixPredictionStatus;
    /**
     * The time after which the prediction will be automatically locked, in seconds from creation.
     */
    get autoLockAfter(): number;
    /**
     * The date when the prediction started.
     */
    get creationDate(): Date;
    /**
     * The date when the prediction ended, or null if it didn't end yet.
     */
    get endDate(): Date | null;
    /**
     * The date when the prediction was locked, or null if it wasn't locked yet.
     */
    get lockDate(): Date | null;
    /**
     * The possible outcomes of the prediction.
     */
    get outcomes(): HelixPredictionOutcome[];
    /**
     * The ID of the winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcomeId(): string | null;
    /**
     * The winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcome(): HelixPredictionOutcome | null;
}
//# sourceMappingURL=HelixPrediction.d.ts.map