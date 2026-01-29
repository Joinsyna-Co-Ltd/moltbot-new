import { DataObject } from '@twurple/common';
import { type HelixPollData, type HelixPollStatus } from '../../interfaces/endpoints/poll.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixPollChoice } from './HelixPollChoice.js';
/**
 * A channel poll.
 */
export declare class HelixPoll extends DataObject<HelixPollData> {
    /**
     * The ID of the poll.
     */
    get id(): string;
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The title of the poll.
     */
    get title(): string;
    /**
     * Whether voting with channel points is enabled for the poll.
     */
    get isChannelPointsVotingEnabled(): boolean;
    /**
     * The amount of channel points that a vote costs.
     */
    get channelPointsPerVote(): number;
    /**
     * The status of the poll.
     */
    get status(): HelixPollStatus;
    /**
     * The duration of the poll, in seconds.
     */
    get durationInSeconds(): number;
    /**
     * The date when the poll started.
     */
    get startDate(): Date;
    /**
     * The date when the poll ended or will end.
     */
    get endDate(): Date;
    /**
     * The choices of the poll.
     */
    get choices(): HelixPollChoice[];
}
//# sourceMappingURL=HelixPoll.d.ts.map