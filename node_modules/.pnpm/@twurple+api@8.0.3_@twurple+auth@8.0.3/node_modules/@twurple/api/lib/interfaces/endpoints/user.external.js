import { extractUserId } from '@twurple/common';
/** @internal */
export function createUserBlockCreateQuery(target, additionalInfo) {
    return {
        target_user_id: extractUserId(target),
        source_context: additionalInfo.sourceContext,
        reason: additionalInfo.reason,
    };
}
/** @internal */
export function createUserBlockDeleteQuery(target) {
    return {
        target_user_id: extractUserId(target),
    };
}
