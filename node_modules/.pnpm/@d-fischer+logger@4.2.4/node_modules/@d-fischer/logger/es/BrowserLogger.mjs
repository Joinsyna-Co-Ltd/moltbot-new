import { __extends } from "tslib";
import { LogLevelToConsoleFunction } from "./LogLevel.mjs";
import { BaseLogger } from "./BaseLogger.mjs";
var BrowserLogger = /** @class */ (function (_super) {
    __extends(BrowserLogger, _super);
    function BrowserLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserLogger.prototype.log = function (level, message) {
        if (level > this._minLevel) {
            return;
        }
        var logFn = LogLevelToConsoleFunction[level];
        var formattedMessage = "[".concat(this._name, "] ").concat(message);
        if (this._timestamps) {
            formattedMessage = "[".concat(new Date().toISOString(), "] ").concat(message);
        }
        logFn(formattedMessage);
    };
    return BrowserLogger;
}(BaseLogger));
export { BrowserLogger };
