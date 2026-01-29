"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRequestFn = setRequestFn;
exports.getRequestFn = getRequestFn;
const origRequestFn = require("request");
let requestFn = origRequestFn;
/**
 * Sets the function to use for performing HTTP requests. Must be compatible with `request`.
 * @param fn The new request function.
 * @category Unit testing
 */
function setRequestFn(fn) {
    requestFn = fn;
}
/**
 * Gets the `request`-compatible function for performing HTTP requests.
 * @returns The request function.
 * @category Unit testing
 */
function getRequestFn() {
    return requestFn;
}
//# sourceMappingURL=request.js.map