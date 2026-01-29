import { type MakeOptional } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import { type UserIdResolvable } from '@twurple/common';
import { type AccessToken, type AccessTokenMaybeWithUserId, type AccessTokenWithUserId } from '../AccessToken.js';
import { type AuthProvider } from './AuthProvider.js';
/**
 * Configuration for the {@link RefreshingAuthProvider}.
 */
export interface RefreshingAuthProviderConfig {
    /**
     * The client ID of your application.
     */
    clientId: string;
    /**
     * The client secret of your application.
     */
    clientSecret: string;
    /**
     * A valid redirect URI for your application.
     *
     * Only required if you use `addUserForCode`.
     */
    redirectUri?: string;
    /**
     * The scopes to be implied by the provider's app access token.
     */
    appImpliedScopes?: string[];
}
/**
 * An auth provider with the ability to make use of refresh tokens,
 * automatically refreshing the access token whenever necessary.
 */
export declare class RefreshingAuthProvider extends EventEmitter implements AuthProvider {
    private readonly _clientId;
    private readonly _redirectUri?;
    private readonly _intentToUserId;
    private readonly _userIdToIntents;
    private readonly _cachedRefreshFailures;
    private readonly _appImpliedScopes;
    /**
     * Fires when a user token is refreshed.
     *
     * @param userId The ID of the user whose token was successfully refreshed.
     * @param token The refreshed token data.
     */
    readonly onRefresh: import("@d-fischer/typed-event-emitter").EventBinder<[userId: string, token: AccessToken]>;
    /**
     * Fires when a user token fails to refresh.
     *
     * @param userId The ID of the user whose token wasn't successfully refreshed.
     */
    readonly onRefreshFailure: import("@d-fischer/typed-event-emitter").EventBinder<[userId: string, error: Error]>;
    /**
     * Creates a new auth provider based on the given one that can automatically
     * refresh access tokens.
     *
     * @param refreshConfig The information necessary to automatically refresh an access token.
     */
    constructor(refreshConfig: RefreshingAuthProviderConfig);
    /**
     * Adds the given user with their corresponding token to the provider.
     *
     * @param user The user to add.
     * @param initialToken The token for the user.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to this user instead.
     */
    addUser(user: UserIdResolvable, initialToken: MakeOptional<AccessToken, 'accessToken' | 'scope'>, intents?: string[]): void;
    /**
     * Figures out the user associated to the given token and adds them to the provider.
     *
     * If you already know the ID of the user you're adding,
     * consider using {@link RefreshingAuthProvider#addUser} instead.
     *
     * @param initialToken The token for the user.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to the associated user instead.
     */
    addUserForToken(initialToken: MakeOptional<AccessToken, 'accessToken' | 'scope'>, intents?: string[]): Promise<string>;
    /**
     * Gets an OAuth token from the given authorization code and adds the user to the provider.
     *
     * An authorization code can be obtained using the
     * [OAuth Authorization Code flow](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow).
     *
     * @param code The authorization code.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to the associated user instead.
     */
    addUserForCode(code: string, intents?: string[]): Promise<string>;
    /**
     * Checks whether a user was added to the provider.
     *
     * @param user The user to check.
     */
    hasUser(user: UserIdResolvable): boolean;
    /**
     * Removes a user from the provider.
     *
     * This also makes all intents this user was assigned to unusable.
     *
     * @param user The user to remove.
     */
    removeUser(user: UserIdResolvable): void;
    /**
     * Adds intents to a user.
     *
     * Any intents that were already set before will be overwritten to point to this user instead.
     *
     * @param user The user to add intents to.
     * @param intents The intents to add to the user.
     */
    addIntentsToUser(user: UserIdResolvable, intents: string[]): void;
    /**
     * Gets all intents assigned to the given user.
     *
     * @param user The user to get intents of.
     */
    getIntentsForUser(user: UserIdResolvable): string[];
    /**
     * Removes all given intents from any user who they might be assigned to.
     *
     * Intents that have not been assigned are silently ignored.
     *
     * @param intents The intents to remove.
     */
    removeIntents(intents: string[]): void;
    /**
     * Requests that the provider fetches a new token from Twitch for the given user.
     *
     * @param user The user to refresh the token for.
     */
    refreshAccessTokenForUser(user: UserIdResolvable): Promise<AccessTokenWithUserId>;
    /**
     * Requests that the provider fetches a new token from Twitch for the given intent.
     *
     * @param intent The intent to refresh the token for.
     */
    refreshAccessTokenForIntent(intent: string): Promise<AccessTokenWithUserId>;
    /**
     * The client ID.
     */
    get clientId(): string;
    /**
     * Gets the scopes that are currently available using the access token.
     *
     * @param user The user to get the current scopes for.
     */
    getCurrentScopesForUser(user: UserIdResolvable): string[];
    /**
     * Gets an access token for the given user.
     *
     * @param user The user to get an access token for.
     * @param scopeSets The requested scopes.
     */
    getAccessTokenForUser(user: UserIdResolvable, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId | null>;
    /**
     * Fetches a token for a user identified by the given intent.
     *
     * @param intent The intent to fetch a token for.
     * @param scopeSets The requested scopes.
     */
    getAccessTokenForIntent(intent: string, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId | null>;
    /**
     * Fetches any token to use with a request that supports both user and app tokens,
     * i.e. public data relating to a user.
     *
     * @param user The user.
     */
    getAnyAccessToken(user?: UserIdResolvable): Promise<AccessTokenMaybeWithUserId>;
    /**
     * Fetches an app access token.
     *
     * @param forceNew Whether to always get a new token, even if the old one is still deemed valid internally.
     */
    getAppAccessToken(forceNew?: boolean): Promise<AccessToken>;
    private _checkIntermediateUserRemoval;
    private _fetchUserToken;
    private _refreshUserTokenWithCallback;
    private _fetchAppToken;
    private _refreshAppToken;
}
//# sourceMappingURL=RefreshingAuthProvider.d.ts.map