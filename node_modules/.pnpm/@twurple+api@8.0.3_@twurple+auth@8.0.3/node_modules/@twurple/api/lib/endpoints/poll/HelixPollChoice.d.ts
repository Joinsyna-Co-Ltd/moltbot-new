import { DataObject } from '@twurple/common';
import { type HelixPollChoiceData } from '../../interfaces/endpoints/poll.external.js';
/**
 * A choice in a channel poll.
 */
export declare class HelixPollChoice extends DataObject<HelixPollChoiceData> {
    /**
     * The ID of the choice.
     */
    get id(): string;
    /**
     * The title of the choice.
     */
    get title(): string;
    /**
     * The total votes the choice received.
     */
    get totalVotes(): number;
    /**
     * The votes the choice received by spending channel points.
     */
    get channelPointsVotes(): number;
}
//# sourceMappingURL=HelixPollChoice.d.ts.map