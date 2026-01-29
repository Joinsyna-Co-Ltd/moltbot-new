import { extractUserId } from '@twurple/common';
/** @internal */
export function createPredictionBody(broadcaster, data) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        title: data.title,
        outcomes: data.outcomes.map(title => ({ title })),
        prediction_window: data.autoLockAfter,
    };
}
/** @internal */
export function createEndPredictionBody(broadcaster, id, status, outcomeId) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        id,
        status,
        winning_outcome_id: outcomeId,
    };
}
