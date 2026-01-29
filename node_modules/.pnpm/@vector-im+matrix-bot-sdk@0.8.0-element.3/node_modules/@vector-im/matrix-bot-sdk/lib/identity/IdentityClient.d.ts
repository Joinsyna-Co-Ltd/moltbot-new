import { OpenIDConnectToken } from "../models/OpenIDConnect";
import { Policies } from "../models/Policies";
import { Metrics } from "../metrics/Metrics";
import { Threepid } from "../models/Threepid";
import { MatrixClient } from "../MatrixClient";
import { IdentityServerAccount, IdentityServerInvite } from "../models/IdentityServerModels";
/**
 * A way to access an Identity Server using the Identity Service API from a MatrixClient.
 * @category Identity Servers
 */
export declare class IdentityClient {
    readonly accessToken: string;
    readonly serverUrl: string;
    readonly matrixClient: MatrixClient;
    /**
     * The metrics instance for this client. Note that metrics for the underlying MatrixClient will
     * not be available here.
     */
    readonly metrics: Metrics;
    /**
     * If truthy, this is a string that will be supplied as `?brand=$brand` where endpoints can
     * result in communications to a user.
     */
    brand: string;
    private constructor();
    /**
     * Gets account information for the logged in user.
     * @returns {Promise<IdentityServerAccount>} Resolves to the account information
     */
    getAccount(): Promise<IdentityServerAccount>;
    /**
     * Gets the terms of service for which the identity server has.
     * @returns {Promise<Policies>} Resolves to the policies of the server.
     */
    getTermsOfService(): Promise<Policies>;
    /**
     * Accepts a given set of URLs from Policy objects returned by the server. This implies acceptance of
     * the terms. Note that this will not update the user's account data to consider these terms accepted
     * in the future - that is an exercise left to the caller.
     * @param {string[]} termsUrls The URLs to count as accepted.
     * @returns {Promise<void>} Resolves when complete.
     */
    acceptTerms(termsUrls: string[]): Promise<void>;
    /**
     * Accepts all the terms of service offered by the identity server. Note that this is only meant to be
     * used by automated bots where terms acceptance is implicit - the terms of service need to be presented
     * to the user in most cases.
     * @returns {Promise<void>} Resolves when complete.
     */
    acceptAllTerms(): Promise<void>;
    /**
     * Looks up a series of third party identifiers (email addresses or phone numbers) to see if they have
     * associated mappings. The returned array will be ordered the same as the input, and have falsey values
     * in place of any failed/missing lookups (eg: no mapping).
     * @param {Threepid[]} identifiers The identifiers to look up.
     * @param {boolean} allowPlaintext If true, the function will accept the server's offer to use plaintext
     * lookups when no other methods are available. The function will always prefer hashed methods.
     * @returns {Promise<string[]>} Resolves to the user IDs (or falsey values) in the same order as the input.
     */
    lookup(identifiers: Threepid[], allowPlaintext?: boolean): Promise<string[]>;
    /**
     * Creates a third party email invite. This will store the invite in the identity server, but
     * not publish the invite to the room - the caller is expected to handle the remaining part. Note
     * that this function is not required to be called when using the Client-Server API for inviting
     * third party addresses to a room. This will make several calls into the room state to populate
     * the invite details, therefore the inviter (the client backing this identity client) must be
     * present in the room.
     * @param {string} emailAddress The email address to invite.
     * @param {string} roomId The room ID to invite to.
     * @returns {Promise<IdentityServerInvite>} Resolves to the identity server's stored invite.
     */
    makeEmailInvite(emailAddress: string, roomId: string): Promise<IdentityServerInvite>;
    /**
     * Performs a web request to the server, applying appropriate authorization headers for
     * this client.
     * @param {"GET"|"POST"|"PUT"|"DELETE"} method The HTTP method to use in the request
     * @param {string} endpoint The endpoint to call. For example: "/_matrix/identity/v2/account"
     * @param {any} qs The query string to send. Optional.
     * @param {any} body The request body to send. Optional. Will be converted to JSON unless the type is a Buffer.
     * @param {number} timeout The number of milliseconds to wait before timing out.
     * @param {boolean} raw If true, the raw response will be returned instead of the response body.
     * @param {string} contentType The content type to send. Only used if the `body` is a Buffer.
     * @param {string} noEncoding Set to true to disable encoding, and return a Buffer. Defaults to false
     * @returns {Promise<any>} Resolves to the response (body), rejected if a non-2xx status code was returned.
     */
    doRequest(method: any, endpoint: any, qs?: any, body?: any, timeout?: number, raw?: boolean, contentType?: string, noEncoding?: boolean): Promise<any>;
    /**
     * Gets an instance of an identity client.
     * @param {OpenIDConnectToken} oidc The OpenID Connect token to register to the identity server with.
     * @param {string} serverUrl The full URL where the identity server can be reached at.
     */
    static acquire(oidc: OpenIDConnectToken, serverUrl: string, mxClient: MatrixClient): Promise<IdentityClient>;
}
