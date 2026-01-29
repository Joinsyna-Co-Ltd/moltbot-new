import { __read, __spreadArray } from "tslib";
export function splitWithLimit(str, delim, count) {
    var parts = str.split(delim);
    if (parts.length <= count) {
        return parts;
    }
    return __spreadArray(__spreadArray([], __read(parts.slice(0, count - 1)), false), [parts.slice(count - 1).join(delim)], false);
}
