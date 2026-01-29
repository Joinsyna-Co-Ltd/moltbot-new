import { __extends, __read, __spreadArray } from "tslib";
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/naming-convention
export function deprecateClass(Base, msg) {
    var deprecateNoticeShown = false;
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!deprecateNoticeShown) {
                // eslint-disable-next-line no-console
                console.warn(msg);
                deprecateNoticeShown = true;
            }
            return _super.apply(this, __spreadArray([], __read(args), false)) || this;
        }
        return class_1;
    }(Base));
}
