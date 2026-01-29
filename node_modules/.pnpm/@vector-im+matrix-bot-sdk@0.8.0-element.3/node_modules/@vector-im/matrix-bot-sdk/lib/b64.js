"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeBase64 = encodeBase64;
exports.encodeUnpaddedBase64 = encodeUnpaddedBase64;
exports.encodeUnpaddedUrlSafeBase64 = encodeUnpaddedUrlSafeBase64;
exports.decodeBase64 = decodeBase64;
exports.decodeUnpaddedBase64 = decodeUnpaddedBase64;
exports.decodeUnpaddedUrlSafeBase64 = decodeUnpaddedUrlSafeBase64;
/**
 * Encodes Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
function encodeBase64(b) {
    if (b instanceof ArrayBuffer) {
        return Buffer.from(b).toString('base64');
    }
    else {
        return Buffer.from(b.buffer, b.byteOffset, b.byteLength).toString('base64');
    }
}
/**
 * Encodes Unpadded Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
function encodeUnpaddedBase64(b) {
    return encodeBase64(b).replace(/=+/g, '');
}
/**
 * Encodes URL-Safe Unpadded Base64.
 * @category Utilities
 * @param {ArrayBuffer | Uint8Array} b The buffer to encode.
 * @returns {string} The Base64 string.
 */
function encodeUnpaddedUrlSafeBase64(b) {
    return encodeUnpaddedBase64(b).replace(/\+/g, '-').replace(/\//g, '_');
}
/**
 * Decodes Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
function decodeBase64(s) {
    return Buffer.from(s, 'base64');
}
/**
 * Decodes Unpadded Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
function decodeUnpaddedBase64(s) {
    return decodeBase64(s); // yay, it's the same
}
/**
 * Decodes URL-Safe Unpadded Base64.
 * @category Utilities
 * @param {string} s The Base64 string.
 * @returns {Uint8Array} The encoded data as a buffer.
 */
function decodeUnpaddedUrlSafeBase64(s) {
    return decodeUnpaddedBase64(s.replace(/-/g, '+').replace(/_/g, '/'));
}
//# sourceMappingURL=b64.js.map