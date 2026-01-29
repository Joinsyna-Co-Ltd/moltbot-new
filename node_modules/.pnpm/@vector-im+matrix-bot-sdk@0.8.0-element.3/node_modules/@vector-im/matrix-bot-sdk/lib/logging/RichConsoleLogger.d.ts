import * as chalk from "chalk";
import { ILogger } from "./ILogger";
/**
 * Prints to the console with colors and a format.
 * @category Logging
 */
export declare class RichConsoleLogger implements ILogger {
    protected chalkDebug: chalk.Chalk;
    protected chalkInfo: chalk.Chalk;
    protected chalkWarning: chalk.Chalk;
    protected chalkError: chalk.Chalk;
    protected chalkTimestamp: chalk.Chalk;
    protected chalkModule: chalk.Chalk;
    protected getTimestamp(): string;
    trace(module: string, ...messageOrObject: any[]): void;
    debug(module: string, ...messageOrObject: any[]): void;
    error(module: string, ...messageOrObject: any[]): void;
    info(module: string, ...messageOrObject: any[]): void;
    warn(module: string, ...messageOrObject: any[]): void;
}
