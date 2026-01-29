"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RustSdkAppserviceCryptoStorageProvider = exports.RustSdkCryptoStorageProvider = void 0;
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mkdirp = require("mkdirp");
const path = require("path");
const promises_1 = require("fs/promises");
const sha512 = require("hash.js/lib/hash/sha/512");
const sha256 = require("hash.js/lib/hash/sha/256");
const LogService_1 = require("../logging/LogService");
async function doesFileExist(path) {
    return (0, promises_1.stat)(path).then(() => true).catch(() => false);
}
/**
 * A crypto storage provider for the file-based rust-sdk store.
 * @category Storage providers
 */
class RustSdkCryptoStorageProvider {
    storagePath;
    storageType;
    db;
    /**
     * Creates a new rust-sdk storage provider.
     * @param storagePath The *directory* to persist database details to.
     * @param storageType The storage type to use. Must be supported by the rust-sdk.
     */
    constructor(storagePath, storageType) {
        this.storagePath = storagePath;
        this.storageType = storageType;
        this.storagePath = path.resolve(this.storagePath);
        mkdirp.sync(storagePath);
        const adapter = new FileSync(path.join(storagePath, "bot-sdk.json"));
        this.db = lowdb(adapter);
        this.db.defaults({
            deviceId: null,
            rooms: {},
        });
    }
    async getMachineStoragePath(deviceId) {
        const newPath = path.join(this.storagePath, sha256().update(deviceId).digest('hex'));
        if (await doesFileExist(newPath)) {
            // Already exists, short circuit.
            return newPath;
        } // else: If the path does NOT exist we might need to perform a migration.
        const legacyFilePath = path.join(this.storagePath, 'matrix-sdk-crypto.sqlite3');
        // XXX: Slightly gross cross-dependency file name expectations.
        if (await doesFileExist(legacyFilePath) === false) {
            // No machine files at all, we can skip.
            return newPath;
        }
        const legacyDeviceId = await this.getDeviceId();
        // We need to move the file.
        const previousDevicePath = path.join(this.storagePath, sha256().update(legacyDeviceId).digest('hex'));
        LogService_1.LogService.warn("RustSdkCryptoStorageProvider", `Migrating path for SDK database for legacy device ${legacyDeviceId}`);
        await (0, promises_1.mkdir)(previousDevicePath);
        await (0, promises_1.rename)(legacyFilePath, path.join(previousDevicePath, 'matrix-sdk-crypto.sqlite3')).catch((ex) => LogService_1.LogService.warn("RustSdkCryptoStorageProvider", `Could not migrate matrix-sdk-crypto.sqlite3`, ex));
        await (0, promises_1.rename)(legacyFilePath, path.join(previousDevicePath, 'matrix-sdk-crypto.sqlite3-shm')).catch((ex) => LogService_1.LogService.warn("RustSdkCryptoStorageProvider", `Could not migrate matrix-sdk-crypto.sqlite3-shm`, ex));
        await (0, promises_1.rename)(legacyFilePath, path.join(previousDevicePath, 'matrix-sdk-crypto.sqlite3-wal')).catch((ex) => LogService_1.LogService.warn("RustSdkCryptoStorageProvider", `Could not migrate matrix-sdk-crypto.sqlite3-wal`, ex));
        return newPath;
    }
    async getDeviceId() {
        return this.db.get('deviceId').value();
    }
    async setDeviceId(deviceId) {
        this.db.set('deviceId', deviceId).write();
    }
    async getRoom(roomId) {
        const key = sha512().update(roomId).digest('hex');
        return this.db.get(`rooms.${key}`).value();
    }
    async storeRoom(roomId, config) {
        const key = sha512().update(roomId).digest('hex');
        this.db.set(`rooms.${key}`, config).write();
    }
}
exports.RustSdkCryptoStorageProvider = RustSdkCryptoStorageProvider;
/**
 * An appservice crypto storage provider for the file-based rust-sdk store.
 * @category Storage providers
 */
class RustSdkAppserviceCryptoStorageProvider extends RustSdkCryptoStorageProvider {
    baseStoragePath;
    /**
     * Creates a new rust-sdk storage provider.
     * @param baseStoragePath The *directory* to persist database details to.
     * @param storageType The storage type to use. Must be supported by the rust-sdk.
     */
    constructor(baseStoragePath, storageType) {
        super(path.join(baseStoragePath, "_default"), storageType);
        this.baseStoragePath = baseStoragePath;
    }
    storageForUser(userId) {
        // sha256 because sha512 is a bit big for some operating systems
        const storagePath = path.join(this.baseStoragePath, sha256().update(userId).digest('hex'));
        return new RustSdkCryptoStorageProvider(storagePath, this.storageType);
    }
}
exports.RustSdkAppserviceCryptoStorageProvider = RustSdkAppserviceCryptoStorageProvider;
//# sourceMappingURL=RustSdkCryptoStorageProvider.js.map