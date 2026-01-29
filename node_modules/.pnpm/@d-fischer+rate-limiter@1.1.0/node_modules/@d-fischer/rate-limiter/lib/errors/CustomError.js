"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
/** @private */
class CustomError extends Error {
    constructor(...params) {
        var _a;
        // @ts-ignore
        super(...params);
        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, new.target.constructor);
    }
    get name() {
        return this.constructor.name;
    }
}
exports.CustomError = CustomError;
