import { extractUserId } from '@twurple/common';
/** @internal */
export function createWhisperQuery(from, to) {
    return {
        from_user_id: extractUserId(from),
        to_user_id: extractUserId(to),
    };
}
