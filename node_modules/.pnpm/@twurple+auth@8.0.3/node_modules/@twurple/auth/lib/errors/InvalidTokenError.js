import { CustomError } from '@twurple/common';
/**
 * Thrown whenever an invalid token is supplied.
 */
export class InvalidTokenError extends CustomError {
    /** @private */
    constructor(options) {
        super('Invalid token supplied', options);
    }
}
