"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplePostgresStorageProvider = void 0;
const postgres = require("postgres");
/**
 * A barebones postgresql storage provider. It is not efficient, but it does work.
 * @category Storage providers
 */
class SimplePostgresStorageProvider {
    trackTransactionsInMemory;
    maxInMemoryTransactions;
    db;
    waitPromise;
    completedTransactions = [];
    /**
     * Creates a new simple postgresql storage provider.
     * @param connectionString The `postgres://` connection string to use.
     * @param trackTransactionsInMemory True (default) to track all received appservice transactions rather than on disk.
     * @param maxInMemoryTransactions The maximum number of transactions to hold in memory before rotating the oldest out. Defaults to 20.
     */
    constructor(connectionString, trackTransactionsInMemory = true, maxInMemoryTransactions = 20) {
        this.trackTransactionsInMemory = trackTransactionsInMemory;
        this.maxInMemoryTransactions = maxInMemoryTransactions;
        this.db = postgres(connectionString);
        this.waitPromise = Promise.all([
            this.db `
                CREATE TABLE IF NOT EXISTS bot_metadata (key TEXT NOT NULL PRIMARY KEY, value TEXT);
            `,
            this.db `
                CREATE TABLE IF NOT EXISTS bot_kv (key TEXT NOT NULL PRIMARY KEY, value TEXT);
            `,
            this.db `
                CREATE TABLE IF NOT EXISTS appservice_users (user_id TEXT NOT NULL PRIMARY KEY, registered BOOLEAN NOT NULL);
            `,
            this.db `
                CREATE TABLE IF NOT EXISTS appservice_transactions (txn_id TEXT NOT NULL PRIMARY KEY, completed BOOLEAN NOT NULL);
            `,
        ]).then();
    }
    async setSyncToken(token) {
        await this.waitPromise;
        return this.db `
            INSERT INTO bot_metadata (key, value) VALUES ('syncToken', ${token}) 
            ON CONFLICT (key) DO UPDATE SET value = ${token};
        `;
    }
    async getSyncToken() {
        await this.waitPromise;
        return (await this.db `
            SELECT value FROM bot_metadata WHERE key = 'syncToken';
        `)[0]?.value;
    }
    async setFilter(filter) {
        await this.waitPromise;
        const filterStr = filter ? JSON.stringify(filter) : null;
        return this.db `
            INSERT INTO bot_metadata (key, value) VALUES ('filter', ${filterStr}) 
            ON CONFLICT (key) DO UPDATE SET value = ${filterStr};
        `;
    }
    async getFilter() {
        await this.waitPromise;
        const value = (await this.db `
            SELECT value FROM bot_metadata WHERE key = 'filter';
        `)[0]?.value;
        return typeof value === "string" ? JSON.parse(value) : value;
    }
    async addRegisteredUser(userId) {
        await this.waitPromise;
        return this.db `
            INSERT INTO appservice_users (user_id, registered) VALUES (${userId}, TRUE) 
            ON CONFLICT (user_id) DO UPDATE SET registered = TRUE;
        `;
    }
    async isUserRegistered(userId) {
        await this.waitPromise;
        return !!(await this.db `
            SELECT registered FROM appservice_users WHERE user_id = ${userId};
        `)[0]?.registered;
    }
    async setTransactionCompleted(transactionId) {
        await this.waitPromise;
        if (this.trackTransactionsInMemory) {
            if (this.completedTransactions.indexOf(transactionId) === -1) {
                this.completedTransactions.push(transactionId);
            }
            if (this.completedTransactions.length > this.maxInMemoryTransactions) {
                this.completedTransactions = this.completedTransactions.reverse().slice(0, this.maxInMemoryTransactions).reverse();
            }
            return;
        }
        return this.db `
            INSERT INTO appservice_transactions (txn_id, completed) VALUES (${transactionId}, TRUE) 
            ON CONFLICT (txn_id) DO UPDATE SET completed = TRUE;
        `;
    }
    async isTransactionCompleted(transactionId) {
        await this.waitPromise;
        if (this.trackTransactionsInMemory) {
            return this.completedTransactions.includes(transactionId);
        }
        return (await this.db `
            SELECT completed FROM appservice_transactions WHERE txn_id = ${transactionId};
        `)[0]?.completed;
    }
    async readValue(key) {
        await this.waitPromise;
        return (await this.db `
            SELECT value FROM bot_kv WHERE key = ${key};
        `)[0]?.value;
    }
    async storeValue(key, value) {
        await this.waitPromise;
        return this.db `
            INSERT INTO bot_kv (key, value) VALUES (${key}, ${value}) 
            ON CONFLICT (key) DO UPDATE SET value = ${value};            
        `.then();
    }
    storageForUser(userId) {
        return new NamespacedPostgresProvider(userId, this);
    }
}
exports.SimplePostgresStorageProvider = SimplePostgresStorageProvider;
/**
 * A namespaced storage provider that uses postgres to store information.
 * @category Storage providers
 */
class NamespacedPostgresProvider {
    prefix;
    parent;
    constructor(prefix, parent) {
        this.prefix = prefix;
        this.parent = parent;
    }
    setFilter(filter) {
        return this.parent.storeValue(`${this.prefix}_internal_filter`, JSON.stringify(filter));
    }
    async getFilter() {
        return this.parent.readValue(`${this.prefix}_internal_filter`).then(r => r ? JSON.parse(r) : r);
    }
    setSyncToken(token) {
        return this.parent.storeValue(`${this.prefix}_internal_syncToken`, token ?? "");
    }
    async getSyncToken() {
        return this.parent.readValue(`${this.prefix}_internal_syncToken`).then(r => r === "" ? null : r);
    }
    storeValue(key, value) {
        return this.parent.storeValue(`${this.prefix}_internal_kv_${key}`, value);
    }
    readValue(key) {
        return this.parent.readValue(`${this.prefix}_internal_kv_${key}`);
    }
}
//# sourceMappingURL=SimplePostgresStorageProvider.js.map