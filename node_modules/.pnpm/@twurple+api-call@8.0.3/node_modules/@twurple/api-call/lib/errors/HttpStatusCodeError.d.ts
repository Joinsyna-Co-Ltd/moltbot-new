import { CustomError } from '@twurple/common';
/**
 * Thrown whenever a HTTP error occurs. Some HTTP errors are handled in the library when they're expected.
 */
export declare class HttpStatusCodeError extends CustomError {
    private readonly _statusCode;
    private readonly _url;
    private readonly _method;
    private readonly _body;
    /** @private */
    constructor(_statusCode: number, statusText: string, _url: string, _method: string, _body: string, isJson: boolean);
    /**
     * The HTTP status code of the error.
     */
    get statusCode(): number;
    /**
     * The URL that was requested.
     */
    get url(): string;
    /**
     * The HTTP method that was used for the request.
     */
    get method(): string;
    /**
     * The body that was used for the request, as a string.
     */
    get body(): string;
}
//# sourceMappingURL=HttpStatusCodeError.d.ts.map