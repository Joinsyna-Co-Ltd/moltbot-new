import { extractUserId } from '@twurple/common';
/** @internal */
export function createStreamQuery(filter) {
    return {
        game_id: filter.game,
        language: filter.language,
        type: filter.type,
        user_id: filter.userId,
        user_login: filter.userName,
    };
}
/** @internal */
export function createStreamMarkerBody(broadcaster, description) {
    return {
        user_id: extractUserId(broadcaster),
        description,
    };
}
/** @internal */
export function createVideoQuery(id) {
    return {
        video_id: id,
    };
}
