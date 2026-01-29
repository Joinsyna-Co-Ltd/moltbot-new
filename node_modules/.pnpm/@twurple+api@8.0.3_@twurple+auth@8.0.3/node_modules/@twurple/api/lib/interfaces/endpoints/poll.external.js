import { extractUserId } from '@twurple/common';
/** @internal */
export function createPollBody(broadcaster, data) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        title: data.title,
        choices: data.choices.map(title => ({ title })),
        duration: data.duration,
        channel_points_voting_enabled: data.channelPointsPerVote != null,
        channel_points_per_vote: data.channelPointsPerVote ?? 0,
    };
}
/** @internal */
export function createPollEndBody(broadcaster, id, showResult) {
    return {
        broadcaster_id: extractUserId(broadcaster),
        id,
        status: showResult ? 'TERMINATED' : 'ARCHIVED',
    };
}
