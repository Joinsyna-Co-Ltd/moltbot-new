/**
 * Given a string formatted as a `@da`, returns a bigint representing the urbit date.
 *
 * @param   {string}  x  The formatted `@da`
 * @return  {bigint}     The urbit date as bigint
 */
export declare function parseDa(x: string): bigint;
export declare function parseDr(x: string): bigint;
/**
 * Given a bigint representing an urbit date, returns a string formatted as a proper `@da`.
 *
 * @param   {bigint}  x  The urbit date as bigint
 * @return  {string}     The formatted `@da`
 */
export declare function renderDa(x: bigint): string;
export declare function renderDr(x: bigint): string;
/**
 * Given a bigint representing an urbit date, returns a unix timestamp.
 *
 * @param   {bigint}  da  The urbit date
 * @return  {number}      The unix timestamp
 */
export declare function toUnix(da: bigint): number;
/**
 * Given a unix timestamp, returns a bigint representing an urbit date
 *
 * @param   {number}  unix  The unix timestamp
 * @return  {bigint}        The urbit date
 */
export declare function fromUnix(unix: number): bigint;
/**
 * Given a number of seconds, return a bigint representing its `@dr`
 */
export declare function fromSeconds(seconds: bigint): bigint;
/**
 * Convert a `@dr` to the amount of seconds it represents, dropping sub-
 * second precision
 */
export declare function toSeconds(dr: bigint): bigint;
