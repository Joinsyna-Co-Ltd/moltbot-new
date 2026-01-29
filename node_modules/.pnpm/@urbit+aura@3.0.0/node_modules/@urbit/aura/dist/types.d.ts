export type aura = 'c' | 'da' | 'dr' | 'f' | 'if' | 'is' | 'n' | 'p' | 'q' | 'rd' | 'rh' | 'rq' | 'rs' | 'sb' | 'sd' | 'si' | 'sv' | 'sw' | 'sx' | 't' | 'ta' | 'tas' | 'ub' | 'ud' | 'ui' | 'uv' | 'uw' | 'ux';
export type dime = {
    aura: aura;
    atom: bigint;
};
export type coin = ({
    type: 'dime';
} & dime) | {
    type: 'blob';
    jam: bigint;
} | {
    type: 'many';
    list: coin[];
};
