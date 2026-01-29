"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichConsoleLogger = void 0;
const chalk = require("chalk");
/* eslint-disable no-console */
/**
 * Prints to the console with colors and a format.
 * @category Logging
 */
class RichConsoleLogger {
    chalkDebug = chalk.cyan;
    chalkInfo = chalk.green;
    chalkWarning = chalk.yellow;
    chalkError = chalk.bold.red;
    chalkTimestamp = chalk.grey;
    chalkModule = chalk.grey;
    getTimestamp() {
        const now = new Date(Date.now()).toUTCString();
        return this.chalkTimestamp(now);
    }
    trace(module, ...messageOrObject) {
        console.trace(this.getTimestamp(), this.chalkDebug("[TRACE]"), this.chalkModule(`[${module}]`), ...messageOrObject);
    }
    debug(module, ...messageOrObject) {
        console.debug(this.getTimestamp(), this.chalkDebug("[DEBUG]"), this.chalkModule(`[${module}]`), ...messageOrObject);
    }
    error(module, ...messageOrObject) {
        console.error(this.getTimestamp(), this.chalkError("[ERROR]"), this.chalkModule(`[${module}]`), ...messageOrObject);
    }
    info(module, ...messageOrObject) {
        console.log(this.getTimestamp(), this.chalkInfo("[INFO]"), this.chalkModule(`[${module}]`), ...messageOrObject);
    }
    warn(module, ...messageOrObject) {
        console.warn(this.getTimestamp(), this.chalkWarning("[WARN]"), this.chalkModule(`[${module}]`), ...messageOrObject);
    }
}
exports.RichConsoleLogger = RichConsoleLogger;
/* eslint-enable no-console */
//# sourceMappingURL=RichConsoleLogger.js.map