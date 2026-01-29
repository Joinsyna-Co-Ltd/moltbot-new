import { type UserIdResolvable } from '@twurple/common';
import type { AccessToken, AccessTokenMaybeWithUserId, AccessTokenWithUserId } from '../AccessToken.js';
import type { AuthProvider } from './AuthProvider.js';
/**
 * An auth provider that always returns the same initially given credentials.
 *
 * You are advised to roll your own auth provider that can handle scope upgrades,
 * or to plan ahead and supply only access tokens that account for all scopes
 * you will ever need.
 */
export declare class StaticAuthProvider implements AuthProvider {
    private _userId?;
    private _scopes?;
    /**
     * Creates a new auth provider with static credentials.
     *
     * @param clientId The client ID of your application.
     * @param accessToken The access token to provide.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     * @param scopes The scopes the supplied token has.
     *
     * If this argument is given, the scopes need to be correct, or weird things might happen. If it's not (i.e. it's `undefined`), we fetch the correct scopes for you.
     *
     * If you can't exactly say which scopes your token has, don't use this parameter/set it to `undefined`.
     */
    constructor(clientId: string, accessToken: string | AccessToken, scopes?: string[]);
    /**
     * The client ID.
     */
    get clientId(): string;
    /**
     * Gets the static access token.
     *
     * If the current access token does not have the requested scopes, this method throws.
     * This makes supplying an access token with the correct scopes from the beginning necessary.
     *
     * @param user Ignored.
     * @param scopeSets The requested scopes.
     */
    getAccessTokenForUser(user: UserIdResolvable, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId>;
    /**
     * Gets the static access token.
     *
     * If the current access token does not have the requested scopes, this method throws.
     * This makes supplying an access token with the correct scopes from the beginning necessary.
     *
     * @param intent Ignored.
     * @param scopeSets The requested scopes.
     */
    getAccessTokenForIntent(intent: string, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId>;
    /**
     * Gets the static access token.
     */
    getAnyAccessToken(): Promise<AccessTokenMaybeWithUserId>;
    /**
     * The scopes that are currently available using the access token.
     */
    getCurrentScopesForUser(): string[];
    private _getAccessToken;
}
//# sourceMappingURL=StaticAuthProvider.d.ts.map