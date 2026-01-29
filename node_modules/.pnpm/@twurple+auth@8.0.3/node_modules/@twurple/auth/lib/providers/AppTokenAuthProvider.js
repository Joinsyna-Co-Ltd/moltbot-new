import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { extractUserId, rtfm } from '@twurple/common';
import { accessTokenIsExpired } from '../AccessToken.js';
import { getAppToken } from '../helpers.js';
import { TokenFetcher } from '../TokenFetcher.js';
/**
 * An auth provider that gets tokens using client credentials.
 */
let AppTokenAuthProvider = class AppTokenAuthProvider {
    _clientId;
    /** @internal */ _clientSecret;
    /** @internal */ _token;
    /** @internal */ _fetcher;
    _impliedScopes;
    /**
     * Creates a new auth provider to receive an application token with using the client ID and secret.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param impliedScopes The scopes that are implied for your application,
     * for example an extension that is allowed to access subscriptions.
     */
    constructor(clientId, clientSecret, impliedScopes = []) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._impliedScopes = impliedScopes;
        this._fetcher = new TokenFetcher(async (scopes) => await this._fetch(scopes));
    }
    /**
     * The client ID.
     */
    get clientId() {
        return this._clientId;
    }
    /**
     * The scopes that are currently available using the access token.
     */
    get currentScopes() {
        return this._impliedScopes;
    }
    /**
     * Can only get tokens for implied scopes (i.e. extension subscription support).
     *
     * The consumer is expected to take care that this is actually set up in the Twitch developer console.
     *
     * @param user The user to get an access token for.
     * @param scopeSets The requested scopes.
     */
    async getAccessTokenForUser(user, ...scopeSets) {
        if (scopeSets.every(scopeSet => scopeSet?.some(scope => this._impliedScopes.includes(scope)) ?? true)) {
            const appToken = await this.getAppAccessToken();
            return {
                ...appToken,
                userId: extractUserId(user),
            };
        }
        throw new Error('Can not get user access token for AppTokenAuthProvider');
    }
    /**
     * Throws, because this auth provider does not support user authentication.
     */
    getCurrentScopesForUser() {
        return this._impliedScopes;
    }
    /**
     * Fetches an app access token.
     */
    async getAnyAccessToken() {
        return await this._fetcher.fetch();
    }
    /**
     * Fetches an app access token.
     *
     * @param forceNew Whether to always get a new token, even if the old one is still deemed valid internally.
     */
    async getAppAccessToken(forceNew = false) {
        if (forceNew) {
            this._token = undefined;
        }
        return await this._fetcher.fetch();
    }
    async _fetch(scopeSets) {
        if (scopeSets.length > 0) {
            for (const scopes of scopeSets) {
                if (this._impliedScopes.length) {
                    if (scopes.every(scope => !this._impliedScopes.includes(scope))) {
                        throw new Error(`One of the scopes ${scopes.join(', ')} requested but only the scope ${this._impliedScopes.join(', ')} is implied`);
                    }
                }
                else {
                    throw new Error(`One of the scopes ${scopes.join(', ')} requested but the client credentials flow does not support scopes`);
                }
            }
        }
        if (!this._token || accessTokenIsExpired(this._token)) {
            return (this._token = await getAppToken(this._clientId, this._clientSecret));
        }
        return this._token;
    }
};
__decorate([
    Enumerable(false)
], AppTokenAuthProvider.prototype, "_clientSecret", void 0);
__decorate([
    Enumerable(false)
], AppTokenAuthProvider.prototype, "_token", void 0);
__decorate([
    Enumerable(false)
], AppTokenAuthProvider.prototype, "_fetcher", void 0);
AppTokenAuthProvider = __decorate([
    rtfm('auth', 'AppTokenAuthProvider', 'clientId')
], AppTokenAuthProvider);
export { AppTokenAuthProvider };
