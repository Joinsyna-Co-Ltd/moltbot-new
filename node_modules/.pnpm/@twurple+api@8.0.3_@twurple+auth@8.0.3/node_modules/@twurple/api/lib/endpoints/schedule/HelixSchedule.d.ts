import { DataObject } from '@twurple/common';
import { type HelixScheduleData } from '../../interfaces/endpoints/schedule.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixScheduleSegment } from './HelixScheduleSegment.js';
/**
 * A schedule of a channel.
 */
export declare class HelixSchedule extends DataObject<HelixScheduleData> {
    /**
     * The segments of the schedule.
     */
    get segments(): HelixScheduleSegment[];
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
     * The date when the current vacation started, or null if the schedule is not in vacation mode.
     */
    get vacationStartDate(): Date | null;
    /**
     * The date when the current vacation ends, or null if the schedule is not in vacation mode.
     */
    get vacationEndDate(): Date | null;
}
//# sourceMappingURL=HelixSchedule.d.ts.map