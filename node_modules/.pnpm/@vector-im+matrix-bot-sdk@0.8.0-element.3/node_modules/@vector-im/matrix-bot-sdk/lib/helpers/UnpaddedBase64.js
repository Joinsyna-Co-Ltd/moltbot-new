"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnpaddedBase64 = void 0;
/**
 * Unpadded Base64 utilities for Matrix.
 * @category Utilities
 */
class UnpaddedBase64 {
    constructor() {
    }
    /**
     * Encodes a buffer to Unpadded Base64
     * @param {Buffer} buf The buffer to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeBuffer(buf) {
        return buf.toString('base64').replace(/[=]*$/g, '');
    }
    /**
     * Encodes a string to Unpadded Base64
     * @param {string} str The string to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeString(str) {
        return UnpaddedBase64.encodeBuffer(Buffer.from(str));
    }
    /**
     * Encodes a buffer to Unpadded Base64 (URL Safe Edition)
     * @param {Buffer} buf The buffer to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeBufferUrlSafe(buf) {
        return UnpaddedBase64.encodeBuffer(buf).replace(/\+/g, '-').replace(/\//g, '_');
    }
    /**
     * Encodes a string to Unpadded Base64 (URL Safe Edition)
     * @param {string} str The string to encode.
     * @returns {string} The Unpadded Base64 string
     */
    static encodeStringUrlSafe(str) {
        return UnpaddedBase64.encodeBufferUrlSafe(Buffer.from(str));
    }
}
exports.UnpaddedBase64 = UnpaddedBase64;
//# sourceMappingURL=UnpaddedBase64.js.map