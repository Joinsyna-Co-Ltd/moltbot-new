import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
export class SafeOpenError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "SafeOpenError";
    }
}
const NOT_FOUND_CODES = new Set(["ENOENT", "ENOTDIR"]);
const ensureTrailingSep = (value) => (value.endsWith(path.sep) ? value : value + path.sep);
const isNodeError = (err) => Boolean(err && typeof err === "object" && "code" in err);
const isNotFoundError = (err) => isNodeError(err) && typeof err.code === "string" && NOT_FOUND_CODES.has(err.code);
const isSymlinkOpenError = (err) => isNodeError(err) && (err.code === "ELOOP" || err.code === "EINVAL" || err.code === "ENOTSUP");
export async function openFileWithinRoot(params) {
    let rootReal;
    try {
        rootReal = await fs.realpath(params.rootDir);
    }
    catch (err) {
        if (isNotFoundError(err)) {
            throw new SafeOpenError("not-found", "root dir not found");
        }
        throw err;
    }
    const rootWithSep = ensureTrailingSep(rootReal);
    const resolved = path.resolve(rootWithSep, params.relativePath);
    if (!resolved.startsWith(rootWithSep)) {
        throw new SafeOpenError("invalid-path", "path escapes root");
    }
    const supportsNoFollow = process.platform !== "win32" && "O_NOFOLLOW" in fsConstants;
    const flags = fsConstants.O_RDONLY | (supportsNoFollow ? fsConstants.O_NOFOLLOW : 0);
    let handle;
    try {
        handle = await fs.open(resolved, flags);
    }
    catch (err) {
        if (isNotFoundError(err)) {
            throw new SafeOpenError("not-found", "file not found");
        }
        if (isSymlinkOpenError(err)) {
            throw new SafeOpenError("invalid-path", "symlink open blocked");
        }
        throw err;
    }
    try {
        const lstat = await fs.lstat(resolved).catch(() => null);
        if (lstat?.isSymbolicLink()) {
            throw new SafeOpenError("invalid-path", "symlink not allowed");
        }
        const realPath = await fs.realpath(resolved);
        if (!realPath.startsWith(rootWithSep)) {
            throw new SafeOpenError("invalid-path", "path escapes root");
        }
        const stat = await handle.stat();
        if (!stat.isFile()) {
            throw new SafeOpenError("invalid-path", "not a file");
        }
        const realStat = await fs.stat(realPath);
        if (stat.ino !== realStat.ino || stat.dev !== realStat.dev) {
            throw new SafeOpenError("invalid-path", "path mismatch");
        }
        return { handle, realPath, stat };
    }
    catch (err) {
        await handle.close().catch(() => { });
        if (err instanceof SafeOpenError)
            throw err;
        if (isNotFoundError(err)) {
            throw new SafeOpenError("not-found", "file not found");
        }
        throw err;
    }
}
