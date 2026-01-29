/**
 * A Matrix event.
 * @category Matrix events
 */
export declare class MatrixEvent<T extends (Object | unknown) = unknown> {
    protected event: any;
    constructor(event: any);
    /**
     * The user ID who sent this event.
     */
    get sender(): string;
    /**
     * The type of this event.
     */
    get type(): string;
    /**
     * The content for this event. May have no properties.
     */
    get content(): T;
    /**
     * Gets the raw event that this MatrixEvent is using.
     * Note that there's no guarantees on formats here - it is the exact
     * same input to the constructor.
     */
    get raw(): any;
}
