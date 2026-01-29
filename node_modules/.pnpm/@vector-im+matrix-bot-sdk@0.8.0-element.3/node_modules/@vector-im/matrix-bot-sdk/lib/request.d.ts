import * as origRequestFn from "request";
/**
 * Sets the function to use for performing HTTP requests. Must be compatible with `request`.
 * @param fn The new request function.
 * @category Unit testing
 */
export declare function setRequestFn(fn: any): void;
/**
 * Gets the `request`-compatible function for performing HTTP requests.
 * @returns The request function.
 * @category Unit testing
 */
export declare function getRequestFn(): typeof origRequestFn;
