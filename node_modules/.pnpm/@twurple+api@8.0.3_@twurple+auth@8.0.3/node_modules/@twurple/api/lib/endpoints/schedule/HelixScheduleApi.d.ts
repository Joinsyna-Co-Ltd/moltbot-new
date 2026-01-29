import { type UserIdResolvable } from '@twurple/common';
import { type HelixCreateScheduleSegmentData, type HelixPaginatedScheduleFilter, type HelixPaginatedScheduleResult, type HelixScheduleFilter, type HelixScheduleSettingsUpdate, type HelixUpdateScheduleSegmentData } from '../../interfaces/endpoints/schedule.input.js';
import { BaseApi } from '../BaseApi.js';
import { HelixPaginatedScheduleSegmentRequest } from './HelixPaginatedScheduleSegmentRequest.js';
import { HelixScheduleSegment } from './HelixScheduleSegment.js';
/**
 * The Helix API methods that deal with schedules.
 *
 * Can be accessed using `client.schedule` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: schedule } = await api.helix.schedule.getSchedule('61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Schedule
 */
export declare class HelixScheduleApi extends BaseApi {
    /**
     * Gets the schedule for a given broadcaster.
     *
     * @param broadcaster The broadcaster to get the schedule of.
     * @param filter
     *
     * @expandParams
     */
    getSchedule(broadcaster: UserIdResolvable, filter?: HelixPaginatedScheduleFilter): Promise<HelixPaginatedScheduleResult>;
    /**
     * Creates a paginator for schedule segments for a given broadcaster.
     *
     * @param broadcaster The broadcaster to get the schedule segments of.
     * @param filter
     *
     * @expandParams
     */
    getScheduleSegmentsPaginated(broadcaster: UserIdResolvable, filter?: HelixScheduleFilter): HelixPaginatedScheduleSegmentRequest;
    /**
     * Gets a set of schedule segments by IDs.
     *
     * @param broadcaster The broadcaster to get schedule segments of.
     * @param ids The IDs of the schedule segments.
     */
    getScheduleSegmentsByIds(broadcaster: UserIdResolvable, ids: string[]): Promise<HelixScheduleSegment[]>;
    /**
     * Gets a single schedule segment by ID.
     *
     * @param broadcaster The broadcaster to get a schedule segment of.
     * @param id The ID of the schedule segment.
     */
    getScheduleSegmentById(broadcaster: UserIdResolvable, id: string): Promise<HelixScheduleSegment | null>;
    /**
     * Gets the schedule for a given broadcaster in iCal format.
     *
     * @param broadcaster The broadcaster to get the schedule for.
     */
    getScheduleAsIcal(broadcaster: UserIdResolvable): Promise<string>;
    /**
     * Updates the schedule settings of a given broadcaster.
     *
     * @param broadcaster The broadcaster to update the schedule settings for.
     * @param settings
     *
     * @expandParams
     */
    updateScheduleSettings(broadcaster: UserIdResolvable, settings: HelixScheduleSettingsUpdate): Promise<void>;
    /**
     * Creates a new segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param data
     *
     * @expandParams
     */
    createScheduleSegment(broadcaster: UserIdResolvable, data: HelixCreateScheduleSegmentData): Promise<HelixScheduleSegment>;
    /**
     * Updates a segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param segmentId The ID of the segment to update.
     * @param data
     *
     * @expandParams
     */
    updateScheduleSegment(broadcaster: UserIdResolvable, segmentId: string, data: HelixUpdateScheduleSegmentData): Promise<HelixScheduleSegment>;
    /**
     * Deletes a segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param segmentId The ID of the segment to update.
     */
    deleteScheduleSegment(broadcaster: UserIdResolvable, segmentId: string): Promise<void>;
}
//# sourceMappingURL=HelixScheduleApi.d.ts.map