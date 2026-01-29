import { __read, __spreadArray } from "tslib";
export function utf8Length(str) {
    return __spreadArray([], __read(str), false).length;
}
export function utf8Substring(str, start, end) {
    return __spreadArray([], __read(str), false).slice(start, end).join('');
}
