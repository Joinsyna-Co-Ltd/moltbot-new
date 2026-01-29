import { __awaiter, __generator } from "tslib";
export function resolveConfigValue(value) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
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
export function resolveConfigValueSync(value) {
    if (typeof value === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return value();
    }
    return value;
}
