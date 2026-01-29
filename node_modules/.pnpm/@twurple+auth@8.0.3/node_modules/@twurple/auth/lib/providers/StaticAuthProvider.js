import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { rtfm } from '@twurple/common';
import { loadAndCompareTokenInfo } from '../helpers.js';
/**
 * An auth provider that always returns the same initially given credentials.
 *
 * You are advised to roll your own auth provider that can handle scope upgrades,
 * or to plan ahead and supply only access tokens that account for all scopes
 * you will ever need.
 */
let StaticAuthProvider = class StaticAuthProvider {
    /** @internal */ _clientId;
    /** @internal */ _accessToken;
    _userId;
    _scopes;
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
    constructor(clientId, accessToken, scopes) {
        this._clientId = clientId || '';
        this._accessToken =
            typeof accessToken === 'string'
                ? {
                    accessToken,
                    refreshToken: null,
                    scope: scopes ?? [],
                    expiresIn: null,
                    obtainmentTimestamp: Date.now(),
                }
                : accessToken;
        this._scopes = scopes;
    }
    /**
     * The client ID.
     */
    get clientId() {
        return this._clientId;
    }
    /**
     * Gets the static access token.
     *
     * If the current access token does not have the requested scopes, this method throws.
     * This makes supplying an access token with the correct scopes from the beginning necessary.
     *
     * @param user Ignored.
     * @param scopeSets The requested scopes.
     */
    async getAccessTokenForUser(user, ...scopeSets) {
        return await this._getAccessToken(scopeSets);
    }
    /**
     * Gets the static access token.
     *
     * If the current access token does not have the requested scopes, this method throws.
     * This makes supplying an access token with the correct scopes from the beginning necessary.
     *
     * @param intent Ignored.
     * @param scopeSets The requested scopes.
     */
    async getAccessTokenForIntent(intent, ...scopeSets) {
        return await this._getAccessToken(scopeSets);
    }
    /**
     * Gets the static access token.
     */
    async getAnyAccessToken() {
        return await this._getAccessToken();
    }
    /**
     * The scopes that are currently available using the access token.
     */
    getCurrentScopesForUser() {
        return this._scopes ?? [];
    }
    async _getAccessToken(requestedScopeSets) {
        const [scopes, userId] = await loadAndCompareTokenInfo(this._clientId, this._accessToken.accessToken, this._userId, this._scopes, requestedScopeSets);
        this._scopes = scopes;
        this._userId = userId;
        return { ...this._accessToken, userId };
    }
};
__decorate([
    Enumerable(false)
], StaticAuthProvider.prototype, "_clientId", void 0);
__decorate([
    Enumerable(false)
], StaticAuthProvider.prototype, "_accessToken", void 0);
StaticAuthProvider = __decorate([
    rtfm('auth', 'StaticAuthProvider', 'clientId')
], StaticAuthProvider);
export { StaticAuthProvider };
