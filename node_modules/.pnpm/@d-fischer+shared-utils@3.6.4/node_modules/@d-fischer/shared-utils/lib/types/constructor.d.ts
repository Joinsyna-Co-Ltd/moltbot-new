export type Constructor<T> = new (...args: any[]) => T;
export type ConstructedType<C> = C extends new (...params: any[]) => infer T ? T : never;
