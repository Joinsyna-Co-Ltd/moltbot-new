import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { createScheduleQuery, } from '../../interfaces/endpoints/schedule.external.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { HelixScheduleSegment } from './HelixScheduleSegment.js';
/**
 * A paginator specifically for schedule segments.
 */
let HelixPaginatedScheduleSegmentRequest = class HelixPaginatedScheduleSegmentRequest extends HelixPaginatedRequest {
    /** @internal */
    constructor(broadcaster, client, filter) {
        super({
            url: 'schedule',
            query: createScheduleQuery(broadcaster, filter),
        }, client, data => new HelixScheduleSegment(data, client), 25);
    }
    // sadly, this hack is necessary to work around the weird data model of schedules
    // while still keeping the pagination code as generic as possible
    /** @internal */
    async _fetchData(additionalOptions = {}) {
        const origData = (await super._fetchData(additionalOptions));
        return {
            data: origData.data.segments ?? [],
            pagination: origData.pagination,
        };
    }
};
HelixPaginatedScheduleSegmentRequest = __decorate([
    rtfm('api', 'HelixPaginatedScheduleSegmentRequest')
], HelixPaginatedScheduleSegmentRequest);
export { HelixPaginatedScheduleSegmentRequest };
