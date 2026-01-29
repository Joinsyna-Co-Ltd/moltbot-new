export type rank = 'czar' | 'king' | 'duke' | 'earl' | 'pawn';
export type size = 'galaxy' | 'star' | 'planet' | 'moon' | 'comet';
export declare const regexP: RegExp;
/**
 * Convert a valid `@p` literal string to a bigint.
 * Throws on malformed input.
 * @param  {String}  str  certified-sane `@p` literal string
 */
export declare function parseP(str: string): bigint;
/**
 * Convert a valid `@p` literal string to a bigint.
 * Returns null on malformed input.
 * @param  {String}  str  `@p` literal string
 */
export declare function parseValidP(str: string): bigint | null;
/**
 * Convert a number to a @p-encoded string.
 * @param  {bigint}  num
 */
export declare function renderP(num: bigint): string;
/**
 * Validate a @p string.
 *
 * @param  {String}  str a string
 * @return  {boolean}
 */
export declare function isValidP(str: string): boolean;
/**
 * Determine the `$rank` of a `@p` value or literal.
 * Throws on malformed input string.
 * @param   {String}  who  `@p` value or literal string
 */
export declare function clan(who: bigint | string): rank;
/**
 * Determine the "size" of a `@p` value or literal.
 * Throws on malformed input string.
 * @param   {String}  who  `@p` value or literal string
 */
export declare function kind(who: bigint | string): size;
export declare function rankToSize(rank: rank): size;
export declare function sizeToRank(size: size): rank;
/**
 * Determine the parent of a `@p` value.
 * Throws on malformed input string.
 * @param  {String | number}  who  `@p` value or literal string
 */
export declare function sein(who: bigint): bigint;
export declare function sein(who: string): string;
/**
 * Render short-form ship name.
 * Throws on malformed input string.
 * @param  {String | number}  who  `@p` value or literal string
 */
export declare function cite(who: bigint | string): string;
export declare const prefixes: RegExpMatchArray;
export declare const suffixes: RegExpMatchArray;
