type fn = {
    t: 'f';
    s: boolean;
    e: sigint;
    a: bigint;
} | {
    t: 'i';
    s: boolean;
} | {
    t: 'n';
};
type dn = {
    t: 'd';
    s: boolean;
    e: sigint;
    a: bigint;
} | {
    t: 'i';
    s: boolean;
} | {
    t: 'n';
};
type sigint = bigint;
export declare function abs(a: sigint): bigint;
export declare function end0(a: bigint, b: bigint): bigint;
export declare function max(a: bigint, b: bigint): bigint;
export declare function sunsi(a: bigint): bigint;
export declare function newsi(a: sigint): bigint;
export declare function cmpsi(a: sigint, b: sigint): number;
export declare function ff(w: bigint, p: bigint, b: sigint, r: 'n' | 'u' | 'd' | 'z' | 'a'): {
    sb: bigint;
    bif: (a: fn) => bigint;
    grd: (a: dn) => bigint;
};
export declare function rd(r: 'n' | 'u' | 'd' | 'z'): {
    sb: bigint;
    bif: (a: fn) => bigint;
    grd: (a: dn) => bigint;
};
export declare function rh(r: 'n' | 'u' | 'd' | 'z'): {
    sb: bigint;
    bif: (a: fn) => bigint;
    grd: (a: dn) => bigint;
};
export declare function rq(r: 'n' | 'u' | 'd' | 'z'): {
    sb: bigint;
    bif: (a: fn) => bigint;
    grd: (a: dn) => bigint;
};
export declare function rs(r: 'n' | 'u' | 'd' | 'z'): {
    sb: bigint;
    bif: (a: fn) => bigint;
    grd: (a: dn) => bigint;
};
export declare function to32old(sign: boolean, int: bigint, fracDit: bigint, frac: bigint, expSign: boolean, exp: bigint): bigint;
export declare function fracToBin(fracDit: number, frac: bigint): string;
export declare function fromN(data: string, precisionBits: number, exponentBits: number): number;
export {};
