"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogger = void 0;
var shared_utils_1 = require("@d-fischer/shared-utils");
var detect_node_1 = require("@d-fischer/detect-node");
var getMinLogLevelFromEnv_1 = require("./getMinLogLevelFromEnv");
var LogLevel_1 = require("./LogLevel");
var BaseLogger = /** @class */ (function () {
    function BaseLogger(_a) {
        var name = _a.name, minLevel = _a.minLevel, _b = _a.emoji, emoji = _b === void 0 ? false : _b, colors = _a.colors, _c = _a.timestamps, timestamps = _c === void 0 ? detect_node_1.isNode : _c;
        var _d, _e;
        this._name = name;
        this._minLevel =
            (_e = (_d = (0, shared_utils_1.mapOptional)(minLevel, function (lv) { return (0, LogLevel_1.resolveLogLevel)(lv); })) !== null && _d !== void 0 ? _d : (0, getMinLogLevelFromEnv_1.getMinLogLevelFromEnv)(name)) !== null && _e !== void 0 ? _e : LogLevel_1.LogLevel.WARNING;
        this._emoji = emoji;
        this._colors = colors;
        this._timestamps = timestamps;
    }
    // region convenience methods
    BaseLogger.prototype.crit = function (message) {
        this.log(LogLevel_1.LogLevel.CRITICAL, message);
    };
    BaseLogger.prototype.error = function (message) {
        this.log(LogLevel_1.LogLevel.ERROR, message);
    };
    BaseLogger.prototype.warn = function (message) {
        this.log(LogLevel_1.LogLevel.WARNING, message);
    };
    BaseLogger.prototype.info = function (message) {
        this.log(LogLevel_1.LogLevel.INFO, message);
    };
    BaseLogger.prototype.debug = function (message) {
        this.log(LogLevel_1.LogLevel.DEBUG, message);
    };
    BaseLogger.prototype.trace = function (message) {
        this.log(LogLevel_1.LogLevel.TRACE, message);
    };
    return BaseLogger;
}());
exports.BaseLogger = BaseLogger;
