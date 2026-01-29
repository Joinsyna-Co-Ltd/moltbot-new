import { extractUserId } from '@twurple/common';
/** @internal */
export function createSubscriptionCheckQuery(broadcaster, user) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        user_id: extractUserId(user),
    };
}
