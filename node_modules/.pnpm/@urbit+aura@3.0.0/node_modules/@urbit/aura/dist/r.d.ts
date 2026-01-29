export type precision = 'h' | 's' | 'd' | 'q' | precisionBits;
type precisionBits = {
    w: number;
    p: number;
    l: string;
};
export declare function parseR(per: precision, str: string): bigint;
export declare function renderR(per: precision, r: bigint): string;
export {};
