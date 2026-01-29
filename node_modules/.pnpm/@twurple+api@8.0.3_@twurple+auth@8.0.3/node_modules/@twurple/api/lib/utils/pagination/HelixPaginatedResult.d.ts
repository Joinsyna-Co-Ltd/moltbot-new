/**
 * A result coming from a Helix resource that is paginated using a cursor.
 */
export interface HelixPaginatedResult<T> {
    /**
     * The returned data.
     */
    readonly data: T[];
    /**
     * A cursor for traversing more results.
     */
    cursor?: string;
}
/**
 * A result coming from a Helix resource that is paginated using a cursor, also including a total number of items.
 */
export interface HelixPaginatedResultWithTotal<T> {
    /**
     * The returned data.
     */
    readonly data: T[];
    /**
     * A cursor for traversing more results.
     */
    cursor: string;
    /**
     * The total number of items.
     */
    total: number;
}
//# sourceMappingURL=HelixPaginatedResult.d.ts.map