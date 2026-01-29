import { extractUserId } from '@twurple/common';
/** @internal */
export function createSharedChatSessionQuery(broadcaster) {
    return {
        broadcaster_id: extractUserId(broadcaster),
    };
}
