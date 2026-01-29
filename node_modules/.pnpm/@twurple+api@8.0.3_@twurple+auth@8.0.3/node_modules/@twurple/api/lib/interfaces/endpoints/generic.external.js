import { extractUserId } from '@twurple/common';
/** @internal */
export function createSingleKeyQuery(key, value) {
    return { [key]: value };
}
/** @internal */
export function createUserQuery(user) {
    return {
        user_id: extractUserId(user),
    };
}
/** @internal */
export function createModeratorActionQuery(broadcaster, moderatorId) {
    return {
        broadcaster_id: broadcaster,
        moderator_id: moderatorId,
    };
}
/** @internal */
export function createGetByIdsQuery(broadcaster, rewardIds) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        id: rewardIds,
    };
}
/** @internal */
export function createChannelUsersCheckQuery(broadcaster, users) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        user_id: users.map(extractUserId),
    };
}
