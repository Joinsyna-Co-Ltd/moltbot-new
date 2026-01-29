"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MXCUrl = void 0;
class MXCUrl {
    domain;
    mediaId;
    static parse(mxcUrl) {
        if (!mxcUrl?.toLowerCase()?.startsWith("mxc://")) {
            throw Error("Not a MXC URI");
        }
        const [domain, ...mediaIdParts] = mxcUrl.slice("mxc://".length).split("/");
        if (!domain) {
            throw Error("missing domain component");
        }
        const mediaId = mediaIdParts?.join('/') ?? undefined;
        if (!mediaId) {
            throw Error("missing mediaId component");
        }
        return new MXCUrl(domain, mediaId);
    }
    constructor(domain, mediaId) {
        this.domain = domain;
        this.mediaId = mediaId;
    }
    toString() {
        return `mxc://${this.domain}/${this.mediaId}`;
    }
}
exports.MXCUrl = MXCUrl;
//# sourceMappingURL=MXCUrl.js.map