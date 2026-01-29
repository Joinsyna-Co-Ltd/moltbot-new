import { DataObject } from '@twurple/common';
import { type HelixHypeTrainStatusData } from '../../interfaces/endpoints/hypeTrain.external.js';
import { HelixHypeTrain } from './HelixHypeTrain.js';
import { HelixHypeTrainAllTimeHigh } from './HelixHypeTrainAllTimeHigh.js';
/**
 * Statistics of Hype Trains on a channel.
 */
export declare class HelixHypeTrainStatus extends DataObject<HelixHypeTrainStatusData> {
    /**
     * The current Hype Train, or null if there is no ongoing Hype Train.
     */
    get current(): HelixHypeTrain | null;
    /**
     * The all-time-high Hype Train statistics for this channel, or null if there was no Hype Train yet.
     */
    get allTimeHigh(): HelixHypeTrainAllTimeHigh | null;
    /**
     * The all-time-high shared Hype Train statistics for this channel, or null if there was no shared Hype Train yet.
     */
    get sharedAllTimeHigh(): HelixHypeTrainAllTimeHigh | null;
}
//# sourceMappingURL=HelixHypeTrainStatus.d.ts.map