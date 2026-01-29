import { DataObject } from '@twurple/common';
import { type HelixScheduleSegmentData } from '../../interfaces/endpoints/schedule.external.js';
import type { HelixGame } from '../game/HelixGame.js';
/**
 * A segment of a schedule.
 */
export declare class HelixScheduleSegment extends DataObject<HelixScheduleSegmentData> {
    /**
     * The ID of the segment.
     */
    get id(): string;
    /**
     * The date when the segment starts.
     */
    get startDate(): Date;
    /**
     * The date when the segment ends.
     */
    get endDate(): Date;
    /**
     * The title of the segment.
     */
    get title(): string;
    /**
     * The date up to which the segment is canceled.
     */
    get cancelEndDate(): Date | null;
    /**
     * The ID of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryId(): string | null;
    /**
     * The name of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryName(): string | null;
    /**
     * Gets more information about the category the segment is scheduled for, or null if no category is specified.
     */
    getCategory(): Promise<HelixGame | null>;
    /**
     * Whether the segment is recurring every week.
     */
    get isRecurring(): boolean;
}
//# sourceMappingURL=HelixScheduleSegment.d.ts.map