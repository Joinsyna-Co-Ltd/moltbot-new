"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
var pick_1 = require("./pick");
// eslint-disable-next-line @typescript-eslint/ban-types
function omit(obj, keys) {
    return (0, pick_1.pick)(obj, Object.keys(obj).filter(function (key) { return !keys.includes(key); }));
}
exports.omit = omit;
