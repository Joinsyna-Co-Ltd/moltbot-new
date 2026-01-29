/**
 * Represents an HTTP error from the Matrix server.
 * @category Error handling
 */
export declare class MatrixError extends Error {
    readonly body: {
        errcode: string;
        error: string;
        retry_after_ms?: number;
    };
    readonly statusCode: number;
    /**
     * Parse a Retry-After header into a number of milliseconds.
     * @see https://www.rfc-editor.org/rfc/rfc9110#field.retry-after
     * @param header The value of a Retry-After header.
     * @throws If the date could not be parsed.
     */
    static parseRetryAfterHeader(header: string): number;
    /**
     * The Matrix error code
     */
    readonly errcode: string;
    /**
     * Optional human-readable error message.
     */
    readonly error: string;
    /**
     * If rate limited, the time in milliseconds to wait before retrying the request
     */
    readonly retryAfterMs?: number;
    /**
     * Creates a new Matrix Error
     * @param body The error body.
     * @param statusCode The HTTP status code.
     */
    constructor(body: {
        errcode: string;
        error: string;
        retry_after_ms?: number;
    }, statusCode: number, headers: Record<string, string>);
    /**
     * Developer-friendly error message.
     */
    get message(): string;
}
