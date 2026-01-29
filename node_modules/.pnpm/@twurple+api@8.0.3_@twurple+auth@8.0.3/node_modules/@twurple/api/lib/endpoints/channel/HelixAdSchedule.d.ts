import { DataObject } from '@twurple/common';
import type { HelixAdScheduleData } from '../../interfaces/endpoints/channel.external.js';
/**
 * Represents a broadcaster's ad schedule.
 */
export declare class HelixAdSchedule extends DataObject<HelixAdScheduleData> {
    /**
     * The number of snoozes available for the broadcaster.
     */
    get snoozeCount(): number;
    /**
     * The date and time when the broadcaster will gain an additional snooze.
     * Returns `null` if all snoozes are already available.
     */
    get snoozeRefreshDate(): Date | null;
    /**
     * The date and time of the broadcaster's next scheduled ad.
     * Returns `null` if channel is not live or has no ad scheduled.
     */
    get nextAdDate(): Date | null;
    /**
     * The length in seconds of the scheduled upcoming ad break.
     */
    get duration(): number;
    /**
     * The date and time of the broadcaster's last ad-break.
     * Returns `null` if channel is not live or has not run an ad.
     */
    get lastAdDate(): Date | null;
    /**
     * The amount of pre-roll free time remaining for the channel in seconds.
     */
    get prerollFreeTime(): number;
}
//# sourceMappingURL=HelixAdSchedule.d.ts.map