import { IStorageProvider } from "./IStorageProvider";
import { IFilterInfo } from "../IFilter";
import { IAppserviceStorageProvider } from "./IAppserviceStorageProvider";
/**
 * A storage provider that persists no information by keeping it all in memory.
 * @category Storage providers
 */
export declare class MemoryStorageProvider implements IStorageProvider, IAppserviceStorageProvider {
    private namespaced;
    private syncToken;
    private filter;
    private appserviceUsers;
    private appserviceTransactions;
    private kvStore;
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
