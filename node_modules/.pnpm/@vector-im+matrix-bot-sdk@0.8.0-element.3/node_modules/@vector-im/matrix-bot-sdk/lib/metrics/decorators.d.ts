/**
 * Times a MatrixClient function call for metrics.
 * @category Metrics
 */
export declare function timedMatrixClientFunctionCall(): (_target: unknown, functionName: string, descriptor: PropertyDescriptor) => void;
/**
 * Times an IdentityClient function call for metrics.
 * @category Metrics
 */
export declare function timedIdentityClientFunctionCall(): (_target: unknown, functionName: string, descriptor: PropertyDescriptor) => void;
/**
 * Times an Intent function call for metrics.
 * @category Metrics
 */
export declare function timedIntentFunctionCall(): (_target: unknown, functionName: string, descriptor: PropertyDescriptor) => void;
