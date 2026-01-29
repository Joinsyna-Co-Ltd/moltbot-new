/** @private */
export class CustomError extends Error {
    constructor(message, options) {
        super(message, options);
        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        Error.captureStackTrace?.(this, new.target.constructor);
    }
    get name() {
        return this.constructor.name;
    }
}
