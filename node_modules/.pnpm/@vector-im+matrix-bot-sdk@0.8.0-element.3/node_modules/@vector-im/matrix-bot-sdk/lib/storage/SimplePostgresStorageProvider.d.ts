import { IStorageProvider } from "./IStorageProvider";
import { IAppserviceStorageProvider } from "./IAppserviceStorageProvider";
import { IFilterInfo } from "../IFilter";
/**
 * A barebones postgresql storage provider. It is not efficient, but it does work.
 * @category Storage providers
 */
export declare class SimplePostgresStorageProvider implements IStorageProvider, IAppserviceStorageProvider {
    private trackTransactionsInMemory;
    private maxInMemoryTransactions;
    private readonly db;
    private readonly waitPromise;
    private completedTransactions;
    /**
     * Creates a new simple postgresql storage provider.
     * @param connectionString The `postgres://` connection string to use.
     * @param trackTransactionsInMemory True (default) to track all received appservice transactions rather than on disk.
     * @param maxInMemoryTransactions The maximum number of transactions to hold in memory before rotating the oldest out. Defaults to 20.
     */
    constructor(connectionString: string, trackTransactionsInMemory?: boolean, maxInMemoryTransactions?: number);
    setSyncToken(token: string | null): Promise<any>;
    getSyncToken(): Promise<string | null>;
    setFilter(filter: IFilterInfo): Promise<any>;
    getFilter(): Promise<IFilterInfo>;
    addRegisteredUser(userId: string): Promise<any>;
    isUserRegistered(userId: string): Promise<boolean>;
    setTransactionCompleted(transactionId: string): Promise<any>;
    isTransactionCompleted(transactionId: string): Promise<boolean>;
    readValue(key: string): Promise<string | null | undefined>;
    storeValue(key: string, value: string): Promise<void>;
    storageForUser(userId: string): IStorageProvider;
}
