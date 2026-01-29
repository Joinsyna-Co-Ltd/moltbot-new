import { __read, __spreadArray } from "tslib";
export function flatten(arr) {
    var _a;
    return (_a = []).concat.apply(_a, __spreadArray([], __read(arr), false));
}
