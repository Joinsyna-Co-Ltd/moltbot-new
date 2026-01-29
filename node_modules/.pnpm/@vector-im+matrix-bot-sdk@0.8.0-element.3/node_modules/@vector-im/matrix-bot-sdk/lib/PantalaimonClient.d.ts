/**
 * A client specifically designed to interact with Pantalaimon instead of
 * a Matrix homeserver. The key part of this is managing the access token
 * and username/password for interacting with Pantalaimon.
 *
 * If the storage provider given claims to have an access token for
 * this client, it will be used even if Pantalaimon considers it invalid.
 *
 * Expected usage:
 * <code>
 *     const storage = new SimpleFsStorageProvider("storage/bot.json");
 *     const pantalaimon = new PantalaimonClient("http://localhost:8008", storage);
 *
 *     // Note that the credentials will only be used if there is no available access token.
 *     const client = await pantalaimon.createClientWithCredentials("username", "password");
 * </code>
 */
import { IStorageProvider } from "./storage/IStorageProvider";
import { MatrixClient } from "./MatrixClient";
/**
 * Supporting functions for interacting with a Pantalaimon instance.
 * @category Encryption
 */
export declare class PantalaimonClient {
    private homeserverUrl;
    private storageProvider;
    /**
     * Creates a new PantalaimonClient class for interacting with Pantalaimon. The storage
     * provider given will also be used in the client.
     * @param {string} homeserverUrl The homeserver (Pantalaimon) URL to interact with.
     * @param {IStorageProvider} storageProvider The storage provider to back the client with.
     */
    constructor(homeserverUrl: string, storageProvider: IStorageProvider);
    /**
     * Authenticates and creates the Pantalaimon-capable client. The username and password given
     * are only used if the storage provider does not reveal an access token.
     * @param {string} username The username to log in with, if needed.
     * @param {string} password The password to log in with, if needed.
     * @returns {Promise<MatrixClient>} Resolves to a MatrixClient ready for interacting with Pantalaimon.
     */
    createClientWithCredentials(username: string, password: string): Promise<MatrixClient>;
}
