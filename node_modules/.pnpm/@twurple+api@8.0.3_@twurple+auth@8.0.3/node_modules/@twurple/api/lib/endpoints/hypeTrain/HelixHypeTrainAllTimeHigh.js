import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * All-time-high Hype Train statistics.
 */
let HelixHypeTrainAllTimeHigh = class HelixHypeTrainAllTimeHigh extends DataObject {
    /**
     * The level reached by the all-time-high Hype Train.
     */
    get level() {
        return this[rawDataSymbol].level;
    }
    /**
     * The total amount of contribution points reached by the all-time-high Hype Train.
     */
    get total() {
        return this[rawDataSymbol].total;
    }
    /**
     * The time when the all-time-high Hype Train was achieved.
     */
    get achievementDate() {
        return new Date(this[rawDataSymbol].achieved_at);
    }
};
HelixHypeTrainAllTimeHigh = __decorate([
    rtfm('api', 'HelixHypeTrainAllTimeHigh')
], HelixHypeTrainAllTimeHigh);
export { HelixHypeTrainAllTimeHigh };
