"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.immutableSplice = void 0;
var tslib_1 = require("tslib");
function immutableSplice(arr, start, deleteCount) {
    var addItems = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        addItems[_i - 3] = arguments[_i];
    }
    return tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(arr.slice(0, start)), false), tslib_1.__read(addItems), false), tslib_1.__read(arr.slice(start + deleteCount)), false);
}
exports.immutableSplice = immutableSplice;
