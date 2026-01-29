"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceKeyAlgorithm = exports.EncryptionAlgorithm = exports.OTKAlgorithm = void 0;
/**
 * One time key algorithms.
 * @category Models
 */
var OTKAlgorithm;
(function (OTKAlgorithm) {
    OTKAlgorithm["Signed"] = "signed_curve25519";
    OTKAlgorithm["Unsigned"] = "curve25519";
})(OTKAlgorithm || (exports.OTKAlgorithm = OTKAlgorithm = {}));
/**
 * The available encryption algorithms.
 * @category Models
 */
var EncryptionAlgorithm;
(function (EncryptionAlgorithm) {
    EncryptionAlgorithm["OlmV1Curve25519AesSha2"] = "m.olm.v1.curve25519-aes-sha2";
    EncryptionAlgorithm["MegolmV1AesSha2"] = "m.megolm.v1.aes-sha2";
})(EncryptionAlgorithm || (exports.EncryptionAlgorithm = EncryptionAlgorithm = {}));
/**
 * The key algorithms for device keys.
 * @category Models
 */
var DeviceKeyAlgorithm;
(function (DeviceKeyAlgorithm) {
    DeviceKeyAlgorithm["Ed25519"] = "ed25519";
    DeviceKeyAlgorithm["Curve25519"] = "curve25519";
})(DeviceKeyAlgorithm || (exports.DeviceKeyAlgorithm = DeviceKeyAlgorithm = {}));
//# sourceMappingURL=Crypto.js.map