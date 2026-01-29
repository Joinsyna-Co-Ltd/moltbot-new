"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiresCrypto = requiresCrypto;
exports.requiresReady = requiresReady;
/**
 * Flags a MatrixClient function as needing end-to-end encryption enabled.
 * @category Encryption
 */
function requiresCrypto() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const client = this; // eslint-disable-line @typescript-eslint/no-this-alias
            if (!client.crypto) {
                throw new Error("End-to-end encryption is not enabled");
            }
            return originalMethod.apply(this, args);
        };
    };
}
/**
 * Flags a CryptoClient function as needing the CryptoClient to be ready.
 * @category Encryption
 */
function requiresReady() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const crypto = this; // eslint-disable-line @typescript-eslint/no-this-alias
            if (!crypto.isReady) {
                throw new Error("End-to-end encryption has not initialized");
            }
            return originalMethod.apply(this, args);
        };
    };
}
//# sourceMappingURL=decorators.js.map