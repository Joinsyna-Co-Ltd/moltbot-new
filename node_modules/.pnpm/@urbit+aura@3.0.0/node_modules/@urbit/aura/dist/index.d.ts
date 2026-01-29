export * from './types';
export { parse, tryParse, valid, slav, slaw, nuck } from './parse';
export { render, scot, rend } from './render';
import { toUnix, fromUnix, fromSeconds, toSeconds } from './d';
export declare const da: {
    toUnix: typeof toUnix;
    fromUnix: typeof fromUnix;
};
export declare const dr: {
    toSeconds: typeof toSeconds;
    fromSeconds: typeof fromSeconds;
};
import type * as pt from './p';
export declare const p: {
    cite: typeof pt.cite;
    sein: typeof pt.sein;
    clan: typeof pt.clan;
    kind: typeof pt.kind;
    rankToSize: typeof pt.rankToSize;
    sizeToRank: typeof pt.sizeToRank;
};
export declare namespace p {
    type rank = pt.rank;
    type size = pt.size;
}
