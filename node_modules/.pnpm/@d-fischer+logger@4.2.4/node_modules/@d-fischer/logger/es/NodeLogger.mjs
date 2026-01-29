var _a, _b, _c;
import { __extends } from "tslib";
import { LogLevel, LogLevelToConsoleFunction } from "./LogLevel.mjs";
import { BaseLogger } from "./BaseLogger.mjs";
export var LogLevelToEmoji = (_a = {},
    _a[LogLevel.CRITICAL] = "\uD83D\uDED1",
    _a[LogLevel.ERROR] = "\u274C",
    // these following two need extra spaces at the end because somehow they consume less space in a terminal than they should...
    _a[LogLevel.WARNING] = "\u26A0\uFE0F ",
    _a[LogLevel.INFO] = "\u2139\uFE0F ",
    _a[LogLevel.DEBUG] = "\uD83D\uDC1E",
    _a[LogLevel.TRACE] = "\uD83D\uDC3E",
    _a);
var colors = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    blackBright: 90,
    redBright: 91,
    greenBright: 92,
    yellowBright: 93,
    blueBright: 94,
    magentaBright: 95,
    cyanBright: 96,
    whiteBright: 97
};
var bgColors = {
    bgBlack: 40,
    bgRed: 41,
    bgGreen: 42,
    bgYellow: 43,
    bgBlue: 44,
    bgMagenta: 45,
    bgCyan: 46,
    bgWhite: 47,
    bgBlackBright: 100,
    bgRedBright: 101,
    bgGreenBright: 102,
    bgYellowBright: 103,
    bgBlueBright: 104,
    bgMagentaBright: 105,
    bgCyanBright: 106,
    bgWhiteBright: 107
};
function createGenericWrapper(color, ending, inner) {
    return function (str) { return "\u001B[".concat(color, "m").concat(inner ? inner(str) : str, "\u001B[").concat(ending, "m"); };
}
function createColorWrapper(color) {
    return createGenericWrapper(colors[color], 39);
}
function createBgWrapper(color, fgWrapper) {
    return createGenericWrapper(bgColors[color], 49, fgWrapper);
}
export var LogLevelToColor = (_b = {},
    _b[LogLevel.CRITICAL] = createColorWrapper('red'),
    _b[LogLevel.ERROR] = createColorWrapper('redBright'),
    _b[LogLevel.WARNING] = createColorWrapper('yellow'),
    _b[LogLevel.INFO] = createColorWrapper('blue'),
    _b[LogLevel.DEBUG] = createColorWrapper('magenta'),
    _b[LogLevel.TRACE] = createGenericWrapper(0, 0),
    _b);
export var LogLevelToBackgroundColor = (_c = {},
    _c[LogLevel.CRITICAL] = createBgWrapper('bgRed', createColorWrapper('white')),
    _c[LogLevel.ERROR] = createBgWrapper('bgRedBright', createColorWrapper('white')),
    _c[LogLevel.WARNING] = createBgWrapper('bgYellow', createColorWrapper('black')),
    _c[LogLevel.INFO] = createBgWrapper('bgBlue', createColorWrapper('white')),
    _c[LogLevel.DEBUG] = createBgWrapper('bgMagenta', createColorWrapper('black')),
    _c[LogLevel.TRACE] = createGenericWrapper(7, 27),
    _c);
var NodeLogger = /** @class */ (function (_super) {
    __extends(NodeLogger, _super);
    function NodeLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeLogger.prototype.log = function (level, message) {
        var _a, _b, _c;
        if (level > this._minLevel) {
            return;
        }
        var logFn = LogLevelToConsoleFunction[level];
        var builtMessage = '';
        if (this._timestamps) {
            builtMessage += "[".concat(new Date().toISOString(), "] ");
        }
        if (this._emoji) {
            var emoji = LogLevelToEmoji[level];
            builtMessage += "".concat(emoji, " ");
        }
        var useColors = (_c = (_a = this._colors) !== null && _a !== void 0 ? _a : (_b = process.stdout) === null || _b === void 0 ? void 0 : _b.isTTY) !== null && _c !== void 0 ? _c : true;
        if (useColors) {
            builtMessage += "".concat(LogLevelToBackgroundColor[level](this._name), " ").concat(LogLevelToBackgroundColor[level](LogLevel[level]), " ").concat(LogLevelToColor[level](message));
        }
        else {
            builtMessage += "[".concat(this._name, ":").concat(LogLevel[level].toLowerCase(), "] ").concat(message);
        }
        logFn(builtMessage);
    };
    return NodeLogger;
}(BaseLogger));
export { NodeLogger };
