"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorageProvider = void 0;
/**
 * A storage provider that persists no information by keeping it all in memory.
 * @category Storage providers
 */
class MemoryStorageProvider {
    namespaced = new Map();
    syncToken;
    filter;
    appserviceUsers = {};
    appserviceTransactions = {};
    kvStore = {};
    setSyncToken(token) {
        this.syncToken = token;
    }
    getSyncToken() {
        return this.syncToken;
    }
    setFilter(filter) {
        this.filter = filter;
    }
    getFilter() {
        return this.filter;
    }
    addRegisteredUser(userId) {
        this.appserviceUsers[userId] = {
            registered: true,
        };
    }
    isUserRegistered(userId) {
        return this.appserviceUsers[userId] && this.appserviceUsers[userId].registered;
    }
    isTransactionCompleted(transactionId) {
        return !!this.appserviceTransactions[transactionId];
    }
    setTransactionCompleted(transactionId) {
        this.appserviceTransactions[transactionId] = true;
    }
    readValue(key) {
        return this.kvStore[key];
    }
    storeValue(key, value) {
        this.kvStore[key] = value;
    }
    storageForUser(userId) {
        if (!this.namespaced.has(userId)) {
            this.namespaced.set(userId, new MemoryStorageProvider());
        }
        return this.namespaced.get(userId);
    }
}
exports.MemoryStorageProvider = MemoryStorageProvider;
//# sourceMappingURL=MemoryStorageProvider.js.map