export type ObjMap<Obj, T> = {
    [name in Extract<keyof Obj, string>]: T;
};
export type ObjMapPart<Obj, T> = Partial<ObjMap<Obj, T>>;
export type KeyMapper<T> = (value: T) => string;
