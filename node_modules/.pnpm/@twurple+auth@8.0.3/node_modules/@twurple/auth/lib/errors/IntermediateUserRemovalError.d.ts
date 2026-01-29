import { CustomError } from '@twurple/common';
/**
 * Thrown whenever a user is removed from an {@link AuthProvider}
 * and at the same time you try to execute an action in that user's context.
 */
export declare class IntermediateUserRemovalError extends CustomError {
    readonly userId: string;
    constructor(userId: string);
}
//# sourceMappingURL=IntermediateUserRemovalError.d.ts.map