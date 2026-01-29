import { DataObject } from '@twurple/common';
import { type HelixHypeTrainAllTimeHighData } from '../../interfaces/endpoints/hypeTrain.external.js';
/**
 * All-time-high Hype Train statistics.
 */
export declare class HelixHypeTrainAllTimeHigh extends DataObject<HelixHypeTrainAllTimeHighData> {
    /**
     * The level reached by the all-time-high Hype Train.
     */
    get level(): number;
    /**
     * The total amount of contribution points reached by the all-time-high Hype Train.
     */
    get total(): number;
    /**
     * The time when the all-time-high Hype Train was achieved.
     */
    get achievementDate(): Date;
}
//# sourceMappingURL=HelixHypeTrainAllTimeHigh.d.ts.map