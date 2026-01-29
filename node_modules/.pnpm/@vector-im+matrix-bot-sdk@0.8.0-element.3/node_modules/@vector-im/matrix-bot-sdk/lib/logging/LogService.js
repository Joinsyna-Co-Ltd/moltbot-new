"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = exports.LogLevel = void 0;
exports.extractRequestError = extractRequestError;
const ConsoleLogger_1 = require("./ConsoleLogger");
/**
 * The log levels to log at.
 * @category Logging
 */
class LogLevel {
    level;
    sequence;
    /**
     * The TRACE channel
     */
    static TRACE = new LogLevel("TRACE", -1);
    /**
     * The DEBUG channel
     */
    static DEBUG = new LogLevel("DEBUG", 0);
    /**
     * The INFO channel
     */
    static INFO = new LogLevel("INFO", 1);
    /**
     * The WARN channel
     */
    static WARN = new LogLevel("WARN", 2);
    /**
     * The ERROR channel
     */
    static ERROR = new LogLevel("ERROR", 3);
    constructor(level, sequence) {
        this.level = level;
        this.sequence = sequence;
    }
    includes(level) {
        return level.sequence >= this.sequence;
    }
    toString() {
        return this.level;
    }
    static fromString(level, defaultLevel = LogLevel.DEBUG) {
        if (!level)
            return defaultLevel;
        if (level.toUpperCase() === LogLevel.TRACE.level)
            return LogLevel.TRACE;
        if (level.toUpperCase() === LogLevel.DEBUG.level)
            return LogLevel.DEBUG;
        if (level.toUpperCase() === LogLevel.INFO.level)
            return LogLevel.INFO;
        if (level.toUpperCase() === LogLevel.WARN.level)
            return LogLevel.WARN;
        if (level.toUpperCase() === LogLevel.ERROR.level)
            return LogLevel.ERROR;
        return defaultLevel;
    }
}
exports.LogLevel = LogLevel;
/**
 * Service class for logging in the bot-sdk
 * @category Logging
 */
class LogService {
    static logger = new ConsoleLogger_1.ConsoleLogger();
    static logLevel = LogLevel.INFO;
    static mutedModules = [];
    constructor() {
    }
    /**
     * The level at which the LogService is running.
     */
    static get level() {
        return this.logLevel;
    }
    /**
     * Sets the log level for this logger. Defaults to DEBUG.
     * @param {LogLevel} level the new log level
     */
    static setLevel(level) {
        LogService.logLevel = level || LogLevel.DEBUG;
    }
    /**
     * Sets a new logger for the Log Service
     * @param {ILogger} logger the new logger
     */
    static setLogger(logger) {
        LogService.logger = logger;
    }
    /**
     * Mutes a module from the logger.
     * @param {string} name The module name to mute.
     */
    static muteModule(name) {
        LogService.mutedModules.push(name);
    }
    /**
     * Logs to the TRACE channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static trace(module, ...messageOrObject) {
        if (!LogService.logLevel.includes(LogLevel.TRACE))
            return;
        if (LogService.mutedModules.includes(module))
            return;
        LogService.logger.trace(module, ...messageOrObject);
    }
    /**
     * Logs to the DEBUG channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static debug(module, ...messageOrObject) {
        if (!LogService.logLevel.includes(LogLevel.DEBUG))
            return;
        if (LogService.mutedModules.includes(module))
            return;
        LogService.logger.debug(module, ...messageOrObject);
    }
    /**
     * Logs to the ERROR channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static error(module, ...messageOrObject) {
        if (!LogService.logLevel.includes(LogLevel.ERROR))
            return;
        if (LogService.mutedModules.includes(module))
            return;
        LogService.logger.error(module, ...messageOrObject);
    }
    /**
     * Logs to the INFO channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static info(module, ...messageOrObject) {
        if (!LogService.logLevel.includes(LogLevel.INFO))
            return;
        if (LogService.mutedModules.includes(module))
            return;
        LogService.logger.info(module, ...messageOrObject);
    }
    /**
     * Logs to the WARN channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static warn(module, ...messageOrObject) {
        if (!LogService.logLevel.includes(LogLevel.WARN))
            return;
        if (LogService.mutedModules.includes(module))
            return;
        LogService.logger.warn(module, ...messageOrObject);
    }
}
exports.LogService = LogService;
/**
 * Extracts the useful part of a request's error into something loggable.
 * @param {Error} err The error to parse.
 * @returns {*} The extracted error, or the given error if unaltered.
 * @category Logging
 */
function extractRequestError(err) {
    if (err && 'body' in err) {
        return err.body;
    }
    return err;
}
//# sourceMappingURL=LogService.js.map