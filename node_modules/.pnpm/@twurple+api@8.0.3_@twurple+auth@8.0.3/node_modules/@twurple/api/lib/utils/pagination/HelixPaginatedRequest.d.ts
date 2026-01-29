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
export declare class HelixPaginatedRequest<D, T> {
    private readonly _callOptions;
    private readonly _mapper;
    private readonly _limitPerPage;
    /**
     * The last fetched page of data associated to the requested resource.
     *
     * Only works with {@link HelixPaginatedRequest#getNext} and not with any other methods of data fetching.
     */
    get current(): D[] | undefined;
    /**
     * Gets the next available page of data associated to the requested resource, or an empty array if there are no more available pages.
     */
    getNext(): Promise<T[]>;
    /**
     * Gets all data associated to the requested resource.
     *
     * Be aware that this makes multiple calls to the Twitch API. Due to this, you might be more suspectible to rate limits.
     *
     * Also be aware that this resets the internal cursor, so avoid using this and {@link HelixPaginatedRequest#getNext}} together.
     */
    getAll(): Promise<T[]>;
    /**
     * Gets the current cursor.
     *
     * Only useful if you want to make manual requests to the API.
     */
    get currentCursor(): string | undefined;
    /**
     * Resets the internal cursor.
     *
     * This will make {@link HelixPaginatedRequest#getNext}} start from the first page again.
     */
    reset(): void;
    [Symbol.asyncIterator](): AsyncGenerator<T, void, undefined>;
}
//# sourceMappingURL=HelixPaginatedRequest.d.ts.map