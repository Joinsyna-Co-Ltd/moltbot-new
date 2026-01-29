export interface PromiseWithResolvers<T = void, E extends Error = Error> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (error: E) => void;
}
export declare function promiseWithResolvers<T = void, E extends Error = Error>(): PromiseWithResolvers<T, E>;
