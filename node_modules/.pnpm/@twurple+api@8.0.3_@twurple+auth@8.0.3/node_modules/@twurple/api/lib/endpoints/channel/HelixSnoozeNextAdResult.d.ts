import { DataObject } from '@twurple/common';
import type { HelixSnoozeNextAdData } from '../../interfaces/endpoints/channel.external.js';
/**
 * Represents the result after a call to snooze the broadcaster's ad schedule.
 */
export declare class HelixSnoozeNextAdResult extends DataObject<HelixSnoozeNextAdData> {
    /**
     * The number of snoozes remaining for the broadcaster.
     */
    get snoozeCount(): number;
    /**
     * The date and time when the broadcaster will gain an additional snooze.
     */
    get snoozeRefreshDate(): Date;
    /**
     * The date and time of the broadcaster's next scheduled ad.
     */
    get nextAdDate(): Date;
}
//# sourceMappingURL=HelixSnoozeNextAdResult.d.ts.map