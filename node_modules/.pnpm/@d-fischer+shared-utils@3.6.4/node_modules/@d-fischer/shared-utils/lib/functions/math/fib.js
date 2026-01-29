"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fibWithLimit = void 0;
var tslib_1 = require("tslib");
function fibWithLimit(limit) {
    var current, next;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                current = 0;
                next = 1;
                _b.label = 1;
            case 1:
                if (!(current < limit)) return [3 /*break*/, 3];
                return [4 /*yield*/, current];
            case 2:
                _b.sent();
                _a = tslib_1.__read([next, current + next], 2), current = _a[0], next = _a[1];
                return [3 /*break*/, 1];
            case 3:
                if (!true) return [3 /*break*/, 5];
                return [4 /*yield*/, limit];
            case 4:
                _b.sent();
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
        }
    });
}
exports.fibWithLimit = fibWithLimit;
