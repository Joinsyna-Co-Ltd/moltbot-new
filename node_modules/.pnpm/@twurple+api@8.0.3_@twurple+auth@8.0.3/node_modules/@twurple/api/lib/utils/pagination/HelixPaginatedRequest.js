import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { rtfm } from '@twurple/common';
if (!Object.prototype.hasOwnProperty.call(Symbol, 'asyncIterator')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unnecessary-condition,@typescript-eslint/no-unsafe-member-access
    Symbol.asyncIterator = Symbol.asyncIterator ?? Symbol.for('Symbol.asyncIterator');
}
/**
 * Represents a request to the new Twitch API (Helix) that utilizes a cursor to paginate through its results.
 *
 * Aside from the methods described below, you can also utilize the async iterator using `for await .. of`:
 *
 * ```ts
 * const result = client.videos.getVideosByUserPaginated('125328655');
 * for await (const video of result) {
 *     console.log(video.title);
 * }
 * ```
 */
let HelixPaginatedRequest = class HelixPaginatedRequest {
    _callOptions;
    _mapper;
    _limitPerPage;
    /** @internal */ _client;
    /** @internal */ _currentCursor;
    /** @internal */ _isFinished = false;
    /** @internal */ _currentData;
    /** @internal */
    constructor(_callOptions, client, _mapper, _limitPerPage = 100) {
        this._callOptions = _callOptions;
        this._mapper = _mapper;
        this._limitPerPage = _limitPerPage;
        this._client = client;
    }
    /**
     * The last fetched page of data associated to the requested resource.
     *
     * Only works with {@link HelixPaginatedRequest#getNext} and not with any other methods of data fetching.
     */
    get current() {
        return this._currentData?.data;
    }
    /**
     * Gets the next available page of data associated to the requested resource, or an empty array if there are no more available pages.
     */
    async getNext() {
        if (this._isFinished) {
            return [];
        }
        const result = await this._fetchData();
        // should never be null, but in practice is sometimes
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!result.data?.length) {
            this._isFinished = true;
            return [];
        }
        return this._processResult(result);
    }
    /**
     * Gets all data associated to the requested resource.
     *
     * Be aware that this makes multiple calls to the Twitch API. Due to this, you might be more suspectible to rate limits.
     *
     * Also be aware that this resets the internal cursor, so avoid using this and {@link HelixPaginatedRequest#getNext}} together.
     */
    async getAll() {
        this.reset();
        const result = [];
        do {
            const data = await this.getNext();
            if (!data.length) {
                break;
            }
            result.push(...data);
        } while (this._currentCursor);
        this.reset();
        return result;
    }
    /**
     * Gets the current cursor.
     *
     * Only useful if you want to make manual requests to the API.
     */
    get currentCursor() {
        return this._currentCursor;
    }
    /**
     * Resets the internal cursor.
     *
     * This will make {@link HelixPaginatedRequest#getNext}} start from the first page again.
     */
    reset() {
        this._currentCursor = undefined;
        this._isFinished = false;
        this._currentData = undefined;
    }
    async *[Symbol.asyncIterator]() {
        this.reset();
        while (true) {
            const data = await this.getNext();
            if (!data.length) {
                break;
            }
            yield* data[Symbol.iterator]();
        }
    }
    /** @internal */
    async _fetchData(additionalOptions = {}) {
        return await this._client.callApi({
            type: 'helix',
            ...this._callOptions,
            ...additionalOptions,
            query: {
                ...this._callOptions.query,
                after: this._currentCursor,
                first: this._limitPerPage.toString(),
                ...additionalOptions.query,
            },
        });
    }
    /** @internal */
    _processResult(result) {
        this._currentCursor = typeof result.pagination === 'string' ? result.pagination : result.pagination?.cursor;
        if (this._currentCursor === undefined) {
            this._isFinished = true;
        }
        this._currentData = result;
        return result.data.reduce((acc, elem) => {
            const mapped = this._mapper(elem);
            return Array.isArray(mapped) ? [...acc, ...mapped] : [...acc, mapped];
        }, []);
    }
};
__decorate([
    Enumerable(false)
], HelixPaginatedRequest.prototype, "_client", void 0);
HelixPaginatedRequest = __decorate([
    rtfm('api', 'HelixPaginatedRequest')
], HelixPaginatedRequest);
export { HelixPaginatedRequest };
