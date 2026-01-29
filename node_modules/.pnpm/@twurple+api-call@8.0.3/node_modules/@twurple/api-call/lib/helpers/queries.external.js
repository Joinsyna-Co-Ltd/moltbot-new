import { extractUserId } from '@twurple/common';
export function createBroadcasterQuery(user) {
    return {
        broadcaster_id: extractUserId(user),
    };
}
