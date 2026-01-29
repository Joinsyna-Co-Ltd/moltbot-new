/**
 * Flags a MatrixClient function as needing end-to-end encryption enabled.
 * @category Encryption
 */
export declare function requiresCrypto(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Flags a CryptoClient function as needing the CryptoClient to be ready.
 * @category Encryption
 */
export declare function requiresReady(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
