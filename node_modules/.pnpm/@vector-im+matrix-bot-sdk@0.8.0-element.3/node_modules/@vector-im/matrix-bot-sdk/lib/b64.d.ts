/**
 * Encodes Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
export declare function encodeBase64(b: ArrayBuffer | Uint8Array): string;
/**
 * Encodes Unpadded Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
export declare function encodeUnpaddedBase64(b: ArrayBuffer | Uint8Array): string;
/**
 * Encodes URL-Safe Unpadded Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
export declare function encodeUnpaddedUrlSafeBase64(b: ArrayBuffer | Uint8Array): string;
/**
 * Decodes Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
export declare function decodeBase64(s: string): Uint8Array;
/**
 * Decodes Unpadded Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
export declare function decodeUnpaddedBase64(s: string): Uint8Array;
/**
 * Decodes URL-Safe Unpadded Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
export declare function decodeUnpaddedUrlSafeBase64(s: string): Uint8Array;
