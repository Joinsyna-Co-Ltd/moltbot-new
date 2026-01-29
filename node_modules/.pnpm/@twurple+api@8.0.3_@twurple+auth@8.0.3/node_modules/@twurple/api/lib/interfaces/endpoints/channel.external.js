import { mapOptional } from '@d-fischer/shared-utils';
import { extractUserId } from '@twurple/common';
/** @internal */
export function createChannelUpdateBody(data) {
    return {
        game_id: data.gameId,
        broadcaster_language: data.language,
        title: data.title,
        delay: data.delay?.toString(),
        tags: data.tags,
        content_classification_labels: data.contentClassificationLabels,
        is_branded_content: data.isBrandedContent,
    };
}
/** @internal */
export function createChannelCommercialBody(broadcaster, length) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        length,
    };
}
/** @internal */
export function createChannelVipUpdateQuery(broadcaster, user) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        user_id: extractUserId(user),
    };
}
/** @internal */
export function createChannelFollowerQuery(broadcaster, user) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        user_id: mapOptional(user, extractUserId),
    };
}
/** @internal */
export function createFollowedChannelQuery(user, broadcaster) {
    return {
        broadcaster_id: mapOptional(broadcaster, extractUserId),
        user_id: extractUserId(user),
    };
}
