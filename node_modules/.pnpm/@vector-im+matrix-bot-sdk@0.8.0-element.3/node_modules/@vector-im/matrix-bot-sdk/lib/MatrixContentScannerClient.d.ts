import { EncryptedFile, MatrixClient } from ".";
export interface ContentScannerResult {
    info: string;
    clean: boolean;
}
export interface ContentScannerErrorResult {
    info: string;
    reason: string;
}
export declare class MatrixContentScannerError extends Error {
    readonly body: ContentScannerErrorResult;
    constructor(body: ContentScannerErrorResult);
}
/**
 * API client for https://github.com/element-hq/matrix-content-scanner-python.
 */
export declare class MatrixContentScannerClient {
    readonly client: MatrixClient;
    constructor(client: MatrixClient);
    scanContent(mxcUrl: string): Promise<ContentScannerResult>;
    scanContentEncrypted(file: EncryptedFile): Promise<ContentScannerResult>;
    downloadContent(mxcUrl: string): ReturnType<MatrixClient["downloadContent"]>;
    downloadEncryptedContent(file: EncryptedFile): Promise<Buffer>;
}
