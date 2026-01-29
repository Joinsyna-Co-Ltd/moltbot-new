import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A segment of a schedule.
 */
let HelixScheduleSegment = class HelixScheduleSegment extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the segment.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The date when the segment starts.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].start_time);
    }
    /**
     * The date when the segment ends.
     */
    get endDate() {
        return new Date(this[rawDataSymbol].end_time);
    }
    /**
     * The title of the segment.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The date up to which the segment is canceled.
     */
    get cancelEndDate() {
        return mapNullable(this[rawDataSymbol].canceled_until, v => new Date(v));
    }
    /**
     * The ID of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryId() {
        return this[rawDataSymbol].category?.id ?? null;
    }
    /**
     * The name of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryName() {
        return this[rawDataSymbol].category?.name ?? null;
    }
    /**
     * Gets more information about the category the segment is scheduled for, or null if no category is specified.
     */
    async getCategory() {
        const categoryId = this[rawDataSymbol].category?.id;
        return categoryId ? await this._client.games.getGameById(categoryId) : null;
    }
    /**
     * Whether the segment is recurring every week.
     */
    get isRecurring() {
        return this[rawDataSymbol].is_recurring;
    }
};
__decorate([
    Enumerable(false)
], HelixScheduleSegment.prototype, "_client", void 0);
HelixScheduleSegment = __decorate([
    rtfm('api', 'HelixScheduleSegment', 'id')
], HelixScheduleSegment);
export { HelixScheduleSegment };
