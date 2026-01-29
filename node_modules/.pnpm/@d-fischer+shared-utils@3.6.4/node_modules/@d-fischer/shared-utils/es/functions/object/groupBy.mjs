import { __values } from "tslib";
export function groupBy(arr, keyFn) {
    var e_1, _a;
    var _b;
    if (typeof keyFn !== 'function') {
        var key_1 = keyFn;
        // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-base-to-string
        keyFn = (function (value) { return value[key_1].toString(); });
    }
    var result = {};
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var item = arr_1_1.value;
            var groupKey = keyFn(item);
            ((_b = result[groupKey]) !== null && _b !== void 0 ? _b : (result[groupKey] = [])).push(item);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
