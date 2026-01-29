"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserLogger = void 0;
var tslib_1 = require("tslib");
var LogLevel_1 = require("./LogLevel");
var BaseLogger_1 = require("./BaseLogger");
var BrowserLogger = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserLogger, _super);
    function BrowserLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserLogger.prototype.log = function (level, message) {
        if (level > this._minLevel) {
            return;
        }
        var logFn = LogLevel_1.LogLevelToConsoleFunction[level];
        var formattedMessage = "[".concat(this._name, "] ").concat(message);
        if (this._timestamps) {
            formattedMessage = "[".concat(new Date().toISOString(), "] ").concat(message);
        }
        logFn(formattedMessage);
    };
    return BrowserLogger;
}(BaseLogger_1.BaseLogger));
exports.BrowserLogger = BrowserLogger;
