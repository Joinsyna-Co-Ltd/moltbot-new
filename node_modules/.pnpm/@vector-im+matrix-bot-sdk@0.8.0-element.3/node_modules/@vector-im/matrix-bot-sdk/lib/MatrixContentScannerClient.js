"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixContentScannerClient = exports.MatrixContentScannerError = void 0;
const MXCUrl_1 = require("./models/MXCUrl");
class MatrixContentScannerError extends Error {
    body;
    constructor(body) {
        super(`Encountered error scanning content (${body.reason}): ${body.info}`);
        this.body = body;
    }
}
exports.MatrixContentScannerError = MatrixContentScannerError;
const errorHandler = (_response, errBody) => {
    return typeof (errBody) === "object" && 'reason' in errBody ?
        new MatrixContentScannerError(errBody) : undefined;
};
/**
 * API client for https://github.com/element-hq/matrix-content-scanner-python.
 */
class MatrixContentScannerClient {
    client;
    constructor(client) {
        this.client = client;
    }
    async scanContent(mxcUrl) {
        const { domain, mediaId } = MXCUrl_1.MXCUrl.parse(mxcUrl);
        const path = `/_matrix/media_proxy/unstable/scan/${domain}/${mediaId}`;
        const res = await this.client.doRequest("GET", path, null, null, null, false, null, false, { errorHandler });
        return res;
    }
    async scanContentEncrypted(file) {
        // Sanity check.
        MXCUrl_1.MXCUrl.parse(file.url);
        const path = `/_matrix/media_proxy/unstable/scan_encrypted`;
        const res = await this.client.doRequest("POST", path, null, { file }, null, false, null, false, { errorHandler });
        return res;
    }
    async downloadContent(mxcUrl) {
        const { domain, mediaId } = MXCUrl_1.MXCUrl.parse(mxcUrl);
        const path = `/_matrix/media_proxy/unstable/download/${encodeURIComponent(domain)}/${encodeURIComponent(mediaId)}`;
        const res = await this.client.doRequest("GET", path, null, null, null, true, null, true, { errorHandler });
        return {
            data: res.body,
            contentType: res.headers["content-type"],
        };
    }
    async downloadEncryptedContent(file) {
        // Sanity check.
        MXCUrl_1.MXCUrl.parse(file.url);
        const path = `/_matrix/media_proxy/unstable/download_encrypted`;
        const res = await this.client.doRequest("POST", path, undefined, {
            file,
        }, null, true, null, true, { errorHandler });
        return res.data;
    }
}
exports.MatrixContentScannerClient = MatrixContentScannerClient;
//# sourceMappingURL=MatrixContentScannerClient.js.map