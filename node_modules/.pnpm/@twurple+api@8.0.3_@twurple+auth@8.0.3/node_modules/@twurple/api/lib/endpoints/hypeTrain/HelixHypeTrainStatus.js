import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixHypeTrain } from './HelixHypeTrain.js';
import { HelixHypeTrainAllTimeHigh } from './HelixHypeTrainAllTimeHigh.js';
/**
 * Statistics of Hype Trains on a channel.
 */
let HelixHypeTrainStatus = class HelixHypeTrainStatus extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The current Hype Train, or null if there is no ongoing Hype Train.
     */
    get current() {
        return mapNullable(this[rawDataSymbol].current, data => new HelixHypeTrain(data, this._client));
    }
    /**
     * The all-time-high Hype Train statistics for this channel, or null if there was no Hype Train yet.
     */
    get allTimeHigh() {
        return mapNullable(this[rawDataSymbol].all_time_high, data => new HelixHypeTrainAllTimeHigh(data));
    }
    /**
     * The all-time-high shared Hype Train statistics for this channel, or null if there was no shared Hype Train yet.
     */
    get sharedAllTimeHigh() {
        return mapNullable(this[rawDataSymbol].shared_all_time_high, data => new HelixHypeTrainAllTimeHigh(data));
    }
};
__decorate([
    Enumerable(false)
], HelixHypeTrainStatus.prototype, "_client", void 0);
HelixHypeTrainStatus = __decorate([
    rtfm('api', 'HelixHypeTrainStatus')
], HelixHypeTrainStatus);
export { HelixHypeTrainStatus };
