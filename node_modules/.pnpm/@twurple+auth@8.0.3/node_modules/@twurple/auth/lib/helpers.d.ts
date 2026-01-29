import type { Logger } from '@d-fischer/logger';
import type { AccessToken } from './AccessToken.js';
import type { AuthProvider } from './providers/AuthProvider.js';
import { TokenInfo } from './TokenInfo.js';
/**
 * Gets an access token with your client credentials and an authorization code.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param code The authorization code.
 * @param redirectUri The redirect URI.
 *
 * This serves no real purpose here, but must still match one of the redirect URIs you configured in the Twitch Developer dashboard.
 */
export declare function exchangeCode(clientId: string, clientSecret: string, code: string, redirectUri: string): Promise<AccessToken>;
/**
 * Gets an app access token with your client credentials.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 */
export declare function getAppToken(clientId: string, clientSecret: string): Promise<AccessToken>;
/**
 * Refreshes an expired access token with your client credentials and the refresh token that was given by the initial authentication.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param refreshToken The refresh token.
 */
export declare function refreshUserToken(clientId: string, clientSecret: string, refreshToken: string): Promise<AccessToken>;
/**
 * Revokes an access token.
 *
 * @param clientId The client ID of your application.
 * @param accessToken The access token.
 */
export declare function revokeToken(clientId: string, accessToken: string): Promise<void>;
/**
 * Gets information about an access token.
 *
 * @param accessToken The access token to get the information of.
 * @param clientId The client ID of your application.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 */
export declare function getTokenInfo(accessToken: string, clientId?: string): Promise<TokenInfo>;
/** @private */
export declare function getValidTokenFromProviderForUser(provider: AuthProvider, userId: string, scopes?: string[], logger?: Logger): Promise<{
    accessToken: AccessToken;
    tokenInfo: TokenInfo;
}>;
/** @private */
export declare function getValidTokenFromProviderForIntent(provider: AuthProvider, intent: string, scopes?: string[], logger?: Logger): Promise<{
    accessToken: AccessToken;
    tokenInfo: TokenInfo;
}>;
/**
 * Compares scopes for a non-upgradable {@link AuthProvider} instance.
 *
 * @param scopesToCompare The scopes to compare against.
 * @param requestedScopes The scopes you requested.
 */
export declare function compareScopes(scopesToCompare: string[], requestedScopes?: string[]): void;
/**
 * Compares scope sets for a non-upgradable {@link AuthProvider} instance.
 *
 * @param scopesToCompare The scopes to compare against.
 * @param requestedScopeSets The scope sets you requested.
 */
export declare function compareScopeSets(scopesToCompare: string[], requestedScopeSets: string[][]): void;
/**
 * Compares scopes for a non-upgradable `AuthProvider` instance, loading them from the token if necessary,
 * and returns them together with the user ID.
 *
 * @param clientId The client ID of your application.
 * @param token The access token.
 * @param userId The user ID that was already loaded.
 * @param loadedScopes The scopes that were already loaded.
 * @param requestedScopeSets The scope sets you requested.
 */
export declare function loadAndCompareTokenInfo(clientId: string, token: string, userId?: string, loadedScopes?: string[], requestedScopeSets?: Array<string[] | undefined>): Promise<[string[] | undefined, string]>;
//# sourceMappingURL=helpers.d.ts.map