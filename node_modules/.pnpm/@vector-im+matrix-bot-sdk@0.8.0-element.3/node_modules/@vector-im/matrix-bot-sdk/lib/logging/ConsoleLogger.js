"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
/* eslint-disable no-console */
/**
 * Logs to the console in a plain format. This is the default logger.
 * @category Logging
 */
class ConsoleLogger {
    trace(module, ...messageOrObject) {
        console.trace(module, ...messageOrObject);
    }
    debug(module, ...messageOrObject) {
        console.debug(module, ...messageOrObject);
    }
    error(module, ...messageOrObject) {
        console.error(module, ...messageOrObject);
    }
    info(module, ...messageOrObject) {
        console.log(module, ...messageOrObject);
    }
    warn(module, ...messageOrObject) {
        console.warn(module, ...messageOrObject);
    }
}
exports.ConsoleLogger = ConsoleLogger;
/* eslint-enable no-console */
//# sourceMappingURL=ConsoleLogger.js.map