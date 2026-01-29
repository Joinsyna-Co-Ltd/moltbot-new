import { MatrixError } from "../models/MatrixError";
import { ILogger } from "./ILogger";
/**
 * The log levels to log at.
 * @category Logging
 */
export declare class LogLevel {
    private level;
    private sequence;
    /**
     * The TRACE channel
     */
    static readonly TRACE: LogLevel;
    /**
     * The DEBUG channel
     */
    static readonly DEBUG: LogLevel;
    /**
     * The INFO channel
     */
    static readonly INFO: LogLevel;
    /**
     * The WARN channel
     */
    static readonly WARN: LogLevel;
    /**
     * The ERROR channel
     */
    static readonly ERROR: LogLevel;
    private constructor();
    includes(level: LogLevel): boolean;
    toString(): string;
    static fromString(level: string, defaultLevel?: LogLevel): LogLevel;
}
/**
 * Service class for logging in the bot-sdk
 * @category Logging
 */
export declare class LogService {
    private static logger;
    private static logLevel;
    private static mutedModules;
    private constructor();
    /**
     * The level at which the LogService is running.
     */
    static get level(): LogLevel;
    /**
     * Sets the log level for this logger. Defaults to DEBUG.
     * @param {LogLevel} level the new log level
     */
    static setLevel(level: LogLevel): void;
    /**
     * Sets a new logger for the Log Service
     * @param {ILogger} logger the new logger
     */
    static setLogger(logger: ILogger): void;
    /**
     * Mutes a module from the logger.
     * @param {string} name The module name to mute.
     */
    static muteModule(name: string): void;
    /**
     * Logs to the TRACE channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static trace(module: string, ...messageOrObject: any[]): void;
    /**
     * Logs to the DEBUG channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static debug(module: string, ...messageOrObject: any[]): void;
    /**
     * Logs to the ERROR channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static error(module: string, ...messageOrObject: any[]): void;
    /**
     * Logs to the INFO channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static info(module: string, ...messageOrObject: any[]): void;
    /**
     * Logs to the WARN channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    static warn(module: string, ...messageOrObject: any[]): void;
}
/**
 * Extracts the useful part of a request's error into something loggable.
 * @param {Error} err The error to parse.
 * @returns {*} The extracted error, or the given error if unaltered.
 * @category Logging
 */
export declare function extractRequestError(err: Error | MatrixError): any;
