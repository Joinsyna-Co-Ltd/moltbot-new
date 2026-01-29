"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantalaimonClient = void 0;
const MatrixClient_1 = require("./MatrixClient");
const MatrixAuth_1 = require("./MatrixAuth");
const ACCESS_TOKEN_STORAGE_KEY = "pantalaimon_access_token";
// TODO: Write a test for this (it's hard because of the many interactions with different parts)
/**
 * Supporting functions for interacting with a Pantalaimon instance.
 * @category Encryption
 */
class PantalaimonClient {
    homeserverUrl;
    storageProvider;
    /**
     * Creates a new PantalaimonClient class for interacting with Pantalaimon. The storage
     * provider given will also be used in the client.
     * @param {string} homeserverUrl The homeserver (Pantalaimon) URL to interact with.
     * @param {IStorageProvider} storageProvider The storage provider to back the client with.
     */
    constructor(homeserverUrl, storageProvider) {
        this.homeserverUrl = homeserverUrl;
        this.storageProvider = storageProvider;
        // nothing to do
    }
    /**
     * Authenticates and creates the Pantalaimon-capable client. The username and password given
     * are only used if the storage provider does not reveal an access token.
     * @param {string} username The username to log in with, if needed.
     * @param {string} password The password to log in with, if needed.
     * @returns {Promise<MatrixClient>} Resolves to a MatrixClient ready for interacting with Pantalaimon.
     */
    async createClientWithCredentials(username, password) {
        const accessToken = await Promise.resolve(this.storageProvider.readValue(ACCESS_TOKEN_STORAGE_KEY));
        if (accessToken) {
            return new MatrixClient_1.MatrixClient(this.homeserverUrl, accessToken, this.storageProvider);
        }
        const auth = new MatrixAuth_1.MatrixAuth(this.homeserverUrl);
        const authedClient = await auth.passwordLogin(username, password);
        await Promise.resolve(this.storageProvider.storeValue(ACCESS_TOKEN_STORAGE_KEY, authedClient.accessToken));
        // We recreate the client to ensure we set it up with the right storage provider.
        return new MatrixClient_1.MatrixClient(this.homeserverUrl, authedClient.accessToken, this.storageProvider);
    }
}
exports.PantalaimonClient = PantalaimonClient;
//# sourceMappingURL=PantalaimonClient.js.map