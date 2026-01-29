declare global {
    interface ErrorOptions {
    }
}
/** @private */
export declare class CustomError extends Error {
    constructor(message: string, options?: ErrorOptions);
    get name(): string;
}
//# sourceMappingURL=CustomError.d.ts.map