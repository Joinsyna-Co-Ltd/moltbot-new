export declare class MXCUrl {
    domain: string;
    mediaId: string;
    static parse(mxcUrl: string): MXCUrl;
    constructor(domain: string, mediaId: string);
    toString(): string;
}
