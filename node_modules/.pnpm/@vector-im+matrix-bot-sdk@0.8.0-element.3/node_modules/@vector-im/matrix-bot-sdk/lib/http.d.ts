export interface DoHttpRequestOpts {
    errorHandler?: (response: any, body: any) => Error | undefined;
}
/**
 * Performs a web request to a server.
 * @category Unit testing
 * @param {string} baseUrl The base URL to apply to the call.
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method The HTTP method to use in the request
 * @param {string} endpoint The endpoint to call. For example: "/_matrix/client/v3/account/whoami"
 * @param {any} qs The query string to send. Optional.
 * @param {any} body The request body to send. Optional. Will be converted to JSON unless the type is a Buffer.
 * @param {any} headers Additional headers to send in the request.
 * @param {number} timeout The number of milliseconds to wait before timing out.
 * @param {boolean} raw If true, the raw response will be returned instead of the response body.
 * @param {string} contentType The content type to send. Only used if the `body` is a Buffer.
 * @param {string} noEncoding Set to true to disable encoding, and return a Buffer. Defaults to false
 * @returns {Promise<any>} Resolves to the response (body), rejected if a non-2xx status code was returned.
 */
export declare function doHttpRequest(baseUrl: string, method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, qs?: any, body?: any, headers?: {}, timeout?: number, raw?: boolean, contentType?: string, noEncoding?: boolean, opts?: DoHttpRequestOpts): Promise<any>;
export declare function redactObjectForLogging(input: any): any;
