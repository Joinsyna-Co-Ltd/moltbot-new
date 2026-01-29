import { aura, coin } from './types';
export declare const regex: {
    [key in aura]: RegExp;
};
export declare const parse: typeof slav;
export default parse;
export declare function slav(aura: aura, str: string): bigint;
export declare const tryParse: typeof slaw;
export declare function slaw(aura: aura, str: string): bigint | null;
export declare function valid(aura: aura, str: string): boolean;
export declare function nuck(str: string): coin | null;
export declare function decodeString(str: string): string;
