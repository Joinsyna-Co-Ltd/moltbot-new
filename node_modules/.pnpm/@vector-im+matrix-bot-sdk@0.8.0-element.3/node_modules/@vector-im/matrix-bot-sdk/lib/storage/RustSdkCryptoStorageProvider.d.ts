import { StoreType as RustSdkCryptoStoreType } from "@matrix-org/matrix-sdk-crypto-nodejs";
import { ICryptoStorageProvider } from "./ICryptoStorageProvider";
import { IAppserviceCryptoStorageProvider } from "./IAppserviceStorageProvider";
import { ICryptoRoomInformation } from "../e2ee/ICryptoRoomInformation";
export { RustSdkCryptoStoreType };
/**
 * A crypto storage provider for the file-based rust-sdk store.
 * @category Storage providers
 */
export declare class RustSdkCryptoStorageProvider implements ICryptoStorageProvider {
    readonly storagePath: string;
    readonly storageType: RustSdkCryptoStoreType;
    private db;
    /**
     * Creates a new rust-sdk storage provider.
     * @param storagePath The *directory* to persist database details to.
     * @param storageType The storage type to use. Must be supported by the rust-sdk.
     */
    constructor(storagePath: string, storageType: RustSdkCryptoStoreType);
    getMachineStoragePath(deviceId: string): Promise<string>;
    getDeviceId(): Promise<string>;
    setDeviceId(deviceId: string): Promise<void>;
    getRoom(roomId: string): Promise<ICryptoRoomInformation>;
    storeRoom(roomId: string, config: ICryptoRoomInformation): Promise<void>;
}
/**
 * An appservice crypto storage provider for the file-based rust-sdk store.
 * @category Storage providers
 */
export declare class RustSdkAppserviceCryptoStorageProvider extends RustSdkCryptoStorageProvider implements IAppserviceCryptoStorageProvider {
    private baseStoragePath;
    /**
     * Creates a new rust-sdk storage provider.
     * @param baseStoragePath The *directory* to persist database details to.
     * @param storageType The storage type to use. Must be supported by the rust-sdk.
     */
    constructor(baseStoragePath: string, storageType: RustSdkCryptoStoreType);
    storageForUser(userId: string): ICryptoStorageProvider;
}
