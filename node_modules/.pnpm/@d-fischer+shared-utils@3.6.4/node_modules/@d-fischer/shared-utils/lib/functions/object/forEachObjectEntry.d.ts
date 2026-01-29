export declare function forEachObjectEntry<T, Obj extends Record<string, unknown>>(obj: Obj, fn: (value: T, key: keyof Obj) => void): void;
