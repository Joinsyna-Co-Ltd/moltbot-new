import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId } from '@twurple/common';
import { createGetByIdsQuery } from '../../interfaces/endpoints/generic.external.js';
import { createScheduleQuery, createScheduleSegmentBody, createScheduleSegmentModifyQuery, createScheduleSegmentUpdateBody, createScheduleSettingsUpdateQuery, } from '../../interfaces/endpoints/schedule.external.js';
import { createPaginationQuery } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixPaginatedScheduleSegmentRequest } from './HelixPaginatedScheduleSegmentRequest.js';
import { HelixSchedule } from './HelixSchedule.js';
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
export class HelixScheduleApi extends BaseApi {
    /**
     * Gets the schedule for a given broadcaster.
     *
     * @param broadcaster The broadcaster to get the schedule of.
     * @param filter
     *
     * @expandParams
     */
    async getSchedule(broadcaster, filter) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'schedule',
            userId: extractUserId(broadcaster),
            query: {
                ...createScheduleQuery(broadcaster, filter),
                ...createPaginationQuery(filter),
            },
        });
        return {
            data: new HelixSchedule(result.data, this._client),
            cursor: result.pagination.cursor,
        };
    }
    /**
     * Creates a paginator for schedule segments for a given broadcaster.
     *
     * @param broadcaster The broadcaster to get the schedule segments of.
     * @param filter
     *
     * @expandParams
     */
    getScheduleSegmentsPaginated(broadcaster, filter) {
        return new HelixPaginatedScheduleSegmentRequest(broadcaster, this._client, filter);
    }
    /**
     * Gets a set of schedule segments by IDs.
     *
     * @param broadcaster The broadcaster to get schedule segments of.
     * @param ids The IDs of the schedule segments.
     */
    async getScheduleSegmentsByIds(broadcaster, ids) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'schedule',
            userId: extractUserId(broadcaster),
            query: createGetByIdsQuery(broadcaster, ids),
        });
        return result.data.segments?.map(data => new HelixScheduleSegment(data, this._client)) ?? [];
    }
    /**
     * Gets a single schedule segment by ID.
     *
     * @param broadcaster The broadcaster to get a schedule segment of.
     * @param id The ID of the schedule segment.
     */
    async getScheduleSegmentById(broadcaster, id) {
        const segments = await this.getScheduleSegmentsByIds(broadcaster, [id]);
        return segments.length ? segments[0] : null;
    }
    /**
     * Gets the schedule for a given broadcaster in iCal format.
     *
     * @param broadcaster The broadcaster to get the schedule for.
     */
    async getScheduleAsIcal(broadcaster) {
        return await this._client.callApi({
            type: 'helix',
            url: 'schedule/icalendar',
            query: createBroadcasterQuery(broadcaster),
        });
    }
    /**
     * Updates the schedule settings of a given broadcaster.
     *
     * @param broadcaster The broadcaster to update the schedule settings for.
     * @param settings
     *
     * @expandParams
     */
    async updateScheduleSettings(broadcaster, settings) {
        await this._client.callApi({
            type: 'helix',
            url: 'schedule/settings',
            method: 'PATCH',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:schedule'],
            query: createScheduleSettingsUpdateQuery(broadcaster, settings),
        });
    }
    /**
     * Creates a new segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param data
     *
     * @expandParams
     */
    async createScheduleSegment(broadcaster, data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'schedule/segment',
            method: 'POST',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:schedule'],
            query: createBroadcasterQuery(broadcaster),
            jsonBody: createScheduleSegmentBody(data),
        });
        return new HelixScheduleSegment(result.data.segments[0], this._client);
    }
    /**
     * Updates a segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param segmentId The ID of the segment to update.
     * @param data
     *
     * @expandParams
     */
    async updateScheduleSegment(broadcaster, segmentId, data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'schedule/segment',
            method: 'PATCH',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:schedule'],
            query: createScheduleSegmentModifyQuery(broadcaster, segmentId),
            jsonBody: createScheduleSegmentUpdateBody(data),
        });
        return new HelixScheduleSegment(result.data.segments[0], this._client);
    }
    /**
     * Deletes a segment in a given broadcaster's schedule.
     *
     * @param broadcaster The broadcaster to create a new schedule segment for.
     * @param segmentId The ID of the segment to update.
     */
    async deleteScheduleSegment(broadcaster, segmentId) {
        await this._client.callApi({
            type: 'helix',
            url: 'schedule/segment',
            method: 'DELETE',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:schedule'],
            query: createScheduleSegmentModifyQuery(broadcaster, segmentId),
        });
    }
}
