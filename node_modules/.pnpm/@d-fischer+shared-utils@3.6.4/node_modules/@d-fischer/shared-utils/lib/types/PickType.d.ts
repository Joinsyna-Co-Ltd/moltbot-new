export type FilterFlags<Base, Condition> = {
    [Key in Extract<keyof Base, string>]: Base[Key] extends Condition ? Key : never;
};
export type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[Extract<keyof Base, string>];
export type PickType<Base, Condition> = Record<AllowedNames<Base, Condition>, Condition>;
