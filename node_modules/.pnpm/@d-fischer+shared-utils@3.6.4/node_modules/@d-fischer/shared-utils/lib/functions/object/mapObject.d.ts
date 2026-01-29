import type { ObjMap } from '../../types/object';
export declare function mapObject<T, O, Obj extends Record<string, unknown> = Record<string, T>>(obj: Obj, fn: (value: T, key: Extract<keyof Obj, string>) => O): ObjMap<Obj, O>;
