/**
 * Unpadded Base64 utilities for Matrix.
 * @category Utilities
 */
export declare class UnpaddedBase64 {
    private constructor();
    /**
     * Encodes a buffer to Unpadded Base64
     * @param {Buffer} buf The buffer to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeBuffer(buf: Buffer): string;
    /**
     * Encodes a string to Unpadded Base64
     * @param {string} str The string to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeString(str: string): string;
    /**
     * Encodes a buffer to Unpadded Base64 (URL Safe Edition)
     * @param {Buffer} buf The buffer to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeBufferUrlSafe(buf: Buffer): string;
    /**
     * Encodes a string to Unpadded Base64 (URL Safe Edition)
     * @param {string} str The string to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeStringUrlSafe(str: string): string;
}
