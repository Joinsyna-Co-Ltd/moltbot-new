import { __read, __spreadArray } from "tslib";
export function immutableSplice(arr, start, deleteCount) {
    var addItems = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        addItems[_i - 3] = arguments[_i];
    }
    return __spreadArray(__spreadArray(__spreadArray([], __read(arr.slice(0, start)), false), __read(addItems), false), __read(arr.slice(start + deleteCount)), false);
}
