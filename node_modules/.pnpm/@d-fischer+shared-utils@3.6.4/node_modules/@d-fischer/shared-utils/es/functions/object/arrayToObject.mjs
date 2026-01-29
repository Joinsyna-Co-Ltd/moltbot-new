import { __read, __spreadArray } from "tslib";
export function arrayToObject(arr, fn) {
    return Object.assign.apply(Object, __spreadArray([{}], __read(arr.map(fn)), false));
}
