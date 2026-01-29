"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToObject = void 0;
var tslib_1 = require("tslib");
function arrayToObject(arr, fn) {
    return Object.assign.apply(Object, tslib_1.__spreadArray([{}], tslib_1.__read(arr.map(fn)), false));
}
exports.arrayToObject = arrayToObject;
