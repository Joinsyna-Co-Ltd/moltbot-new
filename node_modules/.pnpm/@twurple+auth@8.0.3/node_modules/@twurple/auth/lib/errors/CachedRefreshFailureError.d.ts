import { CustomError } from '@twurple/common';
/**
 * Thrown whenever you try to execute an action in the context of a user
 * who is already known to have an invalid token saved in its {@link AuthProvider}.
 */
export declare class CachedRefreshFailureError extends CustomError {
    readonly userId: string;
    constructor(userId: string);
}
//# sourceMappingURL=CachedRefreshFailureError.d.ts.map