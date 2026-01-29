import { ILogger } from "./ILogger";
/**
 * Logs to the console in a plain format. This is the default logger.
 * @category Logging
 */
export declare class ConsoleLogger implements ILogger {
    trace(module: string, ...messageOrObject: any[]): void;
    debug(module: string, ...messageOrObject: any[]): void;
    error(module: string, ...messageOrObject: any[]): void;
    info(module: string, ...messageOrObject: any[]): void;
    warn(module: string, ...messageOrObject: any[]): void;
}
