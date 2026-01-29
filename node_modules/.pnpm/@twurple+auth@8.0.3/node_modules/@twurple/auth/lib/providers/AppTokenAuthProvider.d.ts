import { type UserIdResolvable } from '@twurple/common';
import { type AccessToken, type AccessTokenWithUserId } from '../AccessToken.js';
import { type AuthProvider } from './AuthProvider.js';
/**
 * An auth provider that gets tokens using client credentials.
 */
export declare class AppTokenAuthProvider implements AuthProvider {
    private readonly _clientId;
    private readonly _impliedScopes;
    /**
     * Creates a new auth provider to receive an application token with using the client ID and secret.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param impliedScopes The scopes that are implied for your application,
     * for example an extension that is allowed to access subscriptions.
     */
    constructor(clientId: string, clientSecret: string, impliedScopes?: string[]);
    /**
     * The client ID.
     */
    get clientId(): string;
    /**
     * The scopes that are currently available using the access token.
     */
    get currentScopes(): string[];
    /**
     * Can only get tokens for implied scopes (i.e. extension subscription support).
     *
     * The consumer is expected to take care that this is actually set up in the Twitch developer console.
     *
     * @param user The user to get an access token for.
     * @param scopeSets The requested scopes.
     */
    getAccessTokenForUser(user: UserIdResolvable, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId>;
    /**
     * Throws, because this auth provider does not support user authentication.
     */
    getCurrentScopesForUser(): string[];
    /**
     * Fetches an app access token.
     */
    getAnyAccessToken(): Promise<AccessToken>;
    /**
     * Fetches an app access token.
     *
     * @param forceNew Whether to always get a new token, even if the old one is still deemed valid internally.
     */
    getAppAccessToken(forceNew?: boolean): Promise<AccessToken>;
    private _fetch;
}
//# sourceMappingURL=AppTokenAuthProvider.d.ts.map