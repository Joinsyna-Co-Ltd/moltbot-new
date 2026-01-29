import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Represents the result after a call to snooze the broadcaster's ad schedule.
 */
let HelixSnoozeNextAdResult = class HelixSnoozeNextAdResult extends DataObject {
    /**
     * The number of snoozes remaining for the broadcaster.
     */
    get snoozeCount() {
        return this[rawDataSymbol].snooze_count;
    }
    /**
     * The date and time when the broadcaster will gain an additional snooze.
     */
    get snoozeRefreshDate() {
        return new Date(this[rawDataSymbol].snooze_refresh_at * 1000);
    }
    /**
     * The date and time of the broadcaster's next scheduled ad.
     */
    get nextAdDate() {
        return new Date(this[rawDataSymbol].next_ad_at * 1000);
    }
};
HelixSnoozeNextAdResult = __decorate([
    rtfm('api', 'HelixSnoozeNextAdResult')
], HelixSnoozeNextAdResult);
export { HelixSnoozeNextAdResult };
