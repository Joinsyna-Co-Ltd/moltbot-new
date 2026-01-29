"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFsStorageProvider = void 0;
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const sha512 = require("hash.js/lib/hash/sha/512");
const mkdirp = require("mkdirp");
const path = require("path");
/**
 * A storage provider that uses the disk to store information.
 * @category Storage providers
 */
class SimpleFsStorageProvider {
    trackTransactionsInMemory;
    maxInMemoryTransactions;
    db;
    completedTransactions = [];
    /**
     * Creates a new simple file system storage provider.
     * @param {string} filename The file name (typically 'storage.json') to store data within.
     * @param {boolean} trackTransactionsInMemory True (default) to track all received appservice transactions rather than on disk.
     * @param {int} maxInMemoryTransactions The maximum number of transactions to hold in memory before rotating the oldest out. Defaults to 20.
     */
    constructor(filename, trackTransactionsInMemory = true, maxInMemoryTransactions = 20) {
        this.trackTransactionsInMemory = trackTransactionsInMemory;
        this.maxInMemoryTransactions = maxInMemoryTransactions;
        mkdirp.sync(path.dirname(filename));
        const adapter = new FileSync(filename);
        this.db = lowdb(adapter);
        this.db.defaults({
            syncToken: null,
            filter: null,
            appserviceUsers: {}, // userIdHash => { data }
            appserviceTransactions: {}, // txnIdHash => { data }
            kvStore: {}, // key => value (str)
        }).write();
    }
    setSyncToken(token) {
        this.db.set('syncToken', token).write();
    }
    getSyncToken() {
        return this.db.get('syncToken').value();
    }
    setFilter(filter) {
        this.db.set('filter', filter).write();
    }
    getFilter() {
        return this.db.get('filter').value();
    }
    addRegisteredUser(userId) {
        const key = sha512().update(userId).digest('hex');
        this.db
            .set(`appserviceUsers.${key}.userId`, userId)
            .set(`appserviceUsers.${key}.registered`, true)
            .write();
    }
    isUserRegistered(userId) {
        const key = sha512().update(userId).digest('hex');
        return this.db.get(`appserviceUsers.${key}.registered`).value();
    }
    isTransactionCompleted(transactionId) {
        if (this.trackTransactionsInMemory) {
            return this.completedTransactions.indexOf(transactionId) !== -1;
        }
        const key = sha512().update(transactionId).digest('hex');
        return this.db.get(`appserviceTransactions.${key}.completed`).value();
    }
    setTransactionCompleted(transactionId) {
        if (this.trackTransactionsInMemory) {
            if (this.completedTransactions.indexOf(transactionId) === -1) {
                this.completedTransactions.push(transactionId);
            }
            if (this.completedTransactions.length > this.maxInMemoryTransactions) {
                this.completedTransactions = this.completedTransactions.reverse().slice(0, this.maxInMemoryTransactions).reverse();
            }
            return;
        }
        const key = sha512().update(transactionId).digest('hex');
        this.db
            .set(`appserviceTransactions.${key}.txnId`, transactionId)
            .set(`appserviceTransactions.${key}.completed`, true)
            .write();
    }
    readValue(key) {
        return this.db.get("kvStore").value()[key];
    }
    storeValue(key, value) {
        const kvStore = this.db.get("kvStore").value();
        kvStore[key] = value;
        this.db.set("kvStore", kvStore).write();
    }
    storageForUser(userId) {
        return new NamespacedFsProvider(userId, this);
    }
}
exports.SimpleFsStorageProvider = SimpleFsStorageProvider;
/**
 * A namespaced storage provider that uses the disk to store information.
 * @category Storage providers
 */
class NamespacedFsProvider {
    prefix;
    parent;
    constructor(prefix, parent) {
        this.prefix = prefix;
        this.parent = parent;
    }
    setFilter(filter) {
        return this.parent.storeValue(`${this.prefix}_int_filter`, JSON.stringify(filter));
    }
    getFilter() {
        return Promise.resolve(this.parent.readValue(`${this.prefix}_int_filter`)).then(r => r ? JSON.parse(r) : r);
    }
    setSyncToken(token) {
        return this.parent.storeValue(`${this.prefix}_int_syncToken`, token);
    }
    getSyncToken() {
        return Promise.resolve(this.parent.readValue(`${this.prefix}_int_syncToken`)).then(r => r ?? null);
    }
    readValue(key) {
        return this.parent.readValue(`${this.prefix}_kv_${key}`);
    }
    storeValue(key, value) {
        return this.parent.storeValue(`${this.prefix}_kv_${key}`, value);
    }
}
//# sourceMappingURL=SimpleFsStorageProvider.js.map