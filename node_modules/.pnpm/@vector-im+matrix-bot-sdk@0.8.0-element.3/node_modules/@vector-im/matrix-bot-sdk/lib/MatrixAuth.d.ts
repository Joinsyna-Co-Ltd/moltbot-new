import { MatrixClient } from "./MatrixClient";
/**
 * Functions for interacting with Matrix prior to having an access token. Intended
 * to be used for logging in/registering to get a MatrixClient instance.
 *
 * By design, this limits the options used to create the MatrixClient. To specify
 * custom elements to the client, get the access token from the returned client
 * and create a new MatrixClient instance. Due to the nature of Matrix, it is
 * also recommended to use the homeserverUrl from the generated MatrixClient as
 * it may be different from that given to the MatrixAuth class.
 */
export declare class MatrixAuth {
    private homeserverUrl;
    /**
     * Creates a new MatrixAuth class for creating a MatrixClient
     * @param {string} homeserverUrl The homeserver URL to authenticate against.
     */
    constructor(homeserverUrl: string);
    /**
     * Generate a client with no access token so we can reuse the doRequest
     * logic already written.
     */
    private createTemplateClient;
    /**
     * Performs simple registration using a password for the account. This will
     * assume the server supports the m.login.password flow for registration, and
     * will attempt to complete only that stage. The caller is expected to determine
     * if the homeserver supports registration prior to invocation.
     * @param {string} localpart The localpart (username) to register
     * @param {string} password The password to register with
     * @param {string} deviceName The name of the newly created device. Optional.
     * @returns {Promise<MatrixClient>} Resolves to a logged-in MatrixClient
     */
    passwordRegister(localpart: string, password: string, deviceName?: string): Promise<MatrixClient>;
    /**
     * Performs simple password login with the homeserver. The caller is
     * expected to confirm if the homeserver supports this login flow prior
     * to invocation.
     * @param {string} username The username (localpart or user ID) to log in with
     * @param {string} password The password for the account
     * @param {string} deviceName The name of the newly created device. Optional.
     * @returns {Promise<MatrixClient>} Resolves to a logged-in MatrixClient
     */
    passwordLogin(username: string, password: string, deviceName?: string): Promise<MatrixClient>;
}
