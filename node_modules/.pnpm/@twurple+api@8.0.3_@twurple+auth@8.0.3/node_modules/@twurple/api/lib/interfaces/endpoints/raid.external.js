import { extractUserId } from '@twurple/common';
/** @internal */
export function createRaidStartQuery(from, to) {
    return {
        from_broadcaster_id: extractUserId(from),
        to_broadcaster_id: extractUserId(to),
    };
}
