import { CustomError } from '@twurple/common';
/**
 * Thrown when an intent is requested that was not recognized by the {@link AuthProvider}.
 */
export declare class UnknownIntentError extends CustomError {
    /**
     * The intent that was requested.
     */
    readonly intent: string;
    /** @private */
    constructor(intent: string);
}
//# sourceMappingURL=UnknownIntentError.d.ts.map