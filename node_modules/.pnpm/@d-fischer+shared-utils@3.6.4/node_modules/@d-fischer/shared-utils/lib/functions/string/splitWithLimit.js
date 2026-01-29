"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitWithLimit = void 0;
var tslib_1 = require("tslib");
function splitWithLimit(str, delim, count) {
    var parts = str.split(delim);
    if (parts.length <= count) {
        return parts;
    }
    return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(parts.slice(0, count - 1)), false), [parts.slice(count - 1).join(delim)], false);
}
exports.splitWithLimit = splitWithLimit;
