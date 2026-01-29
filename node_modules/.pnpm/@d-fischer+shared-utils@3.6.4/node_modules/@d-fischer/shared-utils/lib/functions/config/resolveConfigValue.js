"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveConfigValueSync = exports.resolveConfigValue = void 0;
var tslib_1 = require("tslib");
function resolveConfigValue(value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof value === 'function')) return [3 /*break*/, 2];
                    return [4 /*yield*/, value()];
                case 1: 
                // eslint-disable-next-line @typescript-eslint/ban-types
                return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/, value];
            }
        });
    });
}
exports.resolveConfigValue = resolveConfigValue;
function resolveConfigValueSync(value) {
    if (typeof value === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return value();
    }
    return value;
}
exports.resolveConfigValueSync = resolveConfigValueSync;
