/**
 * Convert a number to a `@q`-encoded string.
 * @param   {bigint}  num
 * @return  {String}
 */
export declare function renderQ(num: bigint): string;
/**
 * Convert a `@q`-encoded string to a bigint.
 * Throws on malformed input.
 * @param   {String}  str `@q` string with leading .~
 * @return  {String}
 */
export declare function parseQ(str: string): bigint;
export declare function parseValidQ(str: string): bigint | null;
/**
 * Validate a `@q` string.
 * @param   {String}  str  a string
 * @return  {boolean}
 */
export declare function isValidQ(str: string): boolean;
