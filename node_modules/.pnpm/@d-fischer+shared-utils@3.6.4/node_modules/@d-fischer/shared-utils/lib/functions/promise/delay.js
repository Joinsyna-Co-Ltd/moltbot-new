"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
var tslib_1 = require("tslib");
function delay(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.delay = delay;
