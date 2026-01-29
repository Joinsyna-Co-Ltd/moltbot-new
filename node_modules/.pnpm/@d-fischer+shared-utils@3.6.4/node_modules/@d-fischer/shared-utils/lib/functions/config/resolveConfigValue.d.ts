export type ResolvableValue<T> = T | (() => T | Promise<T>);
export declare function resolveConfigValue<T>(value: ResolvableValue<T>): Promise<T>;
export type ResolvableValueSync<T> = T | (() => T);
export declare function resolveConfigValueSync<T>(value: ResolvableValueSync<T>): T;
