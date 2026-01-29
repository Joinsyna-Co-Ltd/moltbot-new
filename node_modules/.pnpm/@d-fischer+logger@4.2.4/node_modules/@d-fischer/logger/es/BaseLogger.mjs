import { mapOptional } from '@d-fischer/shared-utils';
import { isNode } from '@d-fischer/detect-node';
import { getMinLogLevelFromEnv } from "./getMinLogLevelFromEnv.mjs";
import { LogLevel, resolveLogLevel } from "./LogLevel.mjs";
var BaseLogger = /** @class */ (function () {
    function BaseLogger(_a) {
        var name = _a.name, minLevel = _a.minLevel, _b = _a.emoji, emoji = _b === void 0 ? false : _b, colors = _a.colors, _c = _a.timestamps, timestamps = _c === void 0 ? isNode : _c;
        var _d, _e;
        this._name = name;
        this._minLevel =
            (_e = (_d = mapOptional(minLevel, function (lv) { return resolveLogLevel(lv); })) !== null && _d !== void 0 ? _d : getMinLogLevelFromEnv(name)) !== null && _e !== void 0 ? _e : LogLevel.WARNING;
        this._emoji = emoji;
        this._colors = colors;
        this._timestamps = timestamps;
    }
    // region convenience methods
    BaseLogger.prototype.crit = function (message) {
        this.log(LogLevel.CRITICAL, message);
    };
    BaseLogger.prototype.error = function (message) {
        this.log(LogLevel.ERROR, message);
    };
    BaseLogger.prototype.warn = function (message) {
        this.log(LogLevel.WARNING, message);
    };
    BaseLogger.prototype.info = function (message) {
        this.log(LogLevel.INFO, message);
    };
    BaseLogger.prototype.debug = function (message) {
        this.log(LogLevel.DEBUG, message);
    };
    BaseLogger.prototype.trace = function (message) {
        this.log(LogLevel.TRACE, message);
    };
    return BaseLogger;
}());
export { BaseLogger };
