import { IAppserviceStorageProvider } from "./IAppserviceStorageProvider";
import { IFilterInfo } from "../IFilter";
import { IStorageProvider } from "./IStorageProvider";
/**
 * A storage provider that uses the disk to store information.
 * @category Storage providers
 */
export declare class SimpleFsStorageProvider implements IStorageProvider, IAppserviceStorageProvider {
    private trackTransactionsInMemory;
    private maxInMemoryTransactions;
    private db;
    private completedTransactions;
    /**
     * Creates a new simple file system storage provider.
     * @param {string} filename The file name (typically 'storage.json') to store data within.
     * @param {boolean} trackTransactionsInMemory True (default) to track all received appservice transactions rather than on disk.
     * @param {int} maxInMemoryTransactions The maximum number of transactions to hold in memory before rotating the oldest out. Defaults to 20.
     */
    constructor(filename: string, trackTransactionsInMemory?: boolean, maxInMemoryTransactions?: number);
    setSyncToken(token: string | null): void;
    getSyncToken(): string | null;
    setFilter(filter: IFilterInfo): void;
    getFilter(): IFilterInfo;
    addRegisteredUser(userId: string): void;
    isUserRegistered(userId: string): boolean;
    isTransactionCompleted(transactionId: string): boolean;
    setTransactionCompleted(transactionId: string): void;
    readValue(key: string): string | null | undefined;
    storeValue(key: string, value: string): void;
    storageForUser(userId: string): IStorageProvider;
}
