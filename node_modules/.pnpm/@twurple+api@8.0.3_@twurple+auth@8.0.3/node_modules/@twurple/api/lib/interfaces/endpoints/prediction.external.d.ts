/**
 * The different statuses a prediction can have.
 */
export type HelixPredictionStatus = 'ACTIVE' | 'RESOLVED' | 'CANCELED' | 'LOCKED';
export type HelixPredictionOutcomeColor = 'BLUE' | 'PINK';
/** @private */
export interface HelixPredictorData {
    user_id: string;
    user_name: string;
    user_login: string;
    channel_points_used: number;
    channel_points_won: number | null;
}
/** @private */
export interface HelixPredictionOutcomeData {
    id: string;
    title: string;
    users: number;
    channel_points: number;
    top_predictors: HelixPredictorData[] | null;
    color: HelixPredictionOutcomeColor;
}
/** @private */
export interface HelixPredictionData {
    id: string;
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    title: string;
    winning_outcome_id: string | null;
    outcomes: HelixPredictionOutcomeData[];
    prediction_window: number;
    status: HelixPredictionStatus;
    created_at: string;
    ended_at: string;
    locked_at: string;
}
//# sourceMappingURL=prediction.external.d.ts.map