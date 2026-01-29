import { __decorate } from "tslib";
import { Cacheable, CachedGetter } from '@d-fischer/cache-decorators';
import { ResponseBasedRateLimiter } from '@d-fischer/rate-limiter';
import { promiseWithResolvers } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import { callTwitchApi, callTwitchApiRaw, handleTwitchApiResponseError, HttpStatusCodeError, transformTwitchApiResponse, } from '@twurple/api-call';
import { accessTokenIsExpired, InvalidTokenError, TokenInfo, } from '@twurple/auth';
import { HellFreezesOverError, rtfm } from '@twurple/common';
import * as retry from 'retry';
import { HelixBitsApi } from '../endpoints/bits/HelixBitsApi.js';
import { HelixChannelApi } from '../endpoints/channel/HelixChannelApi.js';
import { HelixChannelPointsApi } from '../endpoints/channelPoints/HelixChannelPointsApi.js';
import { HelixCharityApi } from '../endpoints/charity/HelixCharityApi.js';
import { HelixChatApi } from '../endpoints/chat/HelixChatApi.js';
import { HelixClipApi } from '../endpoints/clip/HelixClipApi.js';
import { HelixContentClassificationLabelApi } from '../endpoints/contentClassificationLabels/HelixContentClassificationLabelApi.js';
import { HelixEntitlementApi } from '../endpoints/entitlements/HelixEntitlementApi.js';
import { HelixEventSubApi } from '../endpoints/eventSub/HelixEventSubApi.js';
import { HelixExtensionsApi } from '../endpoints/extensions/HelixExtensionsApi.js';
import { HelixGameApi } from '../endpoints/game/HelixGameApi.js';
import { HelixGoalApi } from '../endpoints/goals/HelixGoalApi.js';
import { HelixHypeTrainApi } from '../endpoints/hypeTrain/HelixHypeTrainApi.js';
import { HelixModerationApi } from '../endpoints/moderation/HelixModerationApi.js';
import { HelixPollApi } from '../endpoints/poll/HelixPollApi.js';
import { HelixPredictionApi } from '../endpoints/prediction/HelixPredictionApi.js';
import { HelixRaidApi } from '../endpoints/raids/HelixRaidApi.js';
import { HelixScheduleApi } from '../endpoints/schedule/HelixScheduleApi.js';
import { HelixSearchApi } from '../endpoints/search/HelixSearchApi.js';
import { HelixStreamApi } from '../endpoints/stream/HelixStreamApi.js';
import { HelixSubscriptionApi } from '../endpoints/subscriptions/HelixSubscriptionApi.js';
import { HelixTeamApi } from '../endpoints/team/HelixTeamApi.js';
import { HelixUserApi } from '../endpoints/user/HelixUserApi.js';
import { HelixVideoApi } from '../endpoints/video/HelixVideoApi.js';
import { HelixWhisperApi } from '../endpoints/whisper/HelixWhisperApi.js';
import { ApiReportedRequest } from '../reporting/ApiReportedRequest.js';
/** @private */
let BaseApiClient = class BaseApiClient extends EventEmitter {
    _config;
    _logger;
    _rateLimiter;
    onRequest = this.registerEvent();
    /** @internal */
    constructor(config, logger, rateLimiter) {
        super();
        this._config = config;
        this._logger = logger;
        this._rateLimiter = rateLimiter;
    }
    /**
     * Requests scopes from the auth provider for the given user.
     *
     * @param user The user to request scopes for.
     * @param scopes The scopes to request.
     */
    async requestScopesForUser(user, scopes) {
        await this._config.authProvider.getAccessTokenForUser(user, ...scopes.map(scope => [scope]));
    }
    /**
     * Gets information about your access token.
     */
    async getTokenInfo() {
        try {
            const data = await this.callApi({ type: 'auth', url: 'validate' });
            return new TokenInfo(data);
        }
        catch (e) {
            if (e instanceof HttpStatusCodeError && e.statusCode === 401) {
                throw new InvalidTokenError({ cause: e });
            }
            throw e;
        }
    }
    /**
     * Makes a call to the Twitch API using your access token.
     *
     * @param options The configuration of the call.
     */
    async callApi(options) {
        const { authProvider } = this._config;
        const shouldAuth = options.auth ?? true;
        if (!shouldAuth) {
            return await callTwitchApi(options, authProvider.clientId, undefined, undefined, this._config.fetchOptions);
        }
        let forceUser = false;
        if (options.forceType) {
            switch (options.forceType) {
                case 'app': {
                    if (!authProvider.getAppAccessToken) {
                        throw new Error('Tried to make an API call that requires an app access token but your auth provider does not support that');
                    }
                    const accessToken = await authProvider.getAppAccessToken();
                    return await this._callApiUsingInitialToken(options, accessToken);
                }
                case 'user': {
                    forceUser = true;
                    break;
                }
                default: {
                    throw new HellFreezesOverError(`Unknown forced token type: ${options.forceType}`);
                }
            }
        }
        if (options.scopes) {
            forceUser = true;
        }
        if (forceUser) {
            const contextUserId = options.canOverrideScopedUserContext
                ? this._getUserIdFromRequestContext(options.userId)
                : options.userId;
            if (!contextUserId) {
                throw new Error('Tried to make an API call with a user context but no context user ID');
            }
            const accessToken = await authProvider.getAccessTokenForUser(contextUserId, options.scopes);
            if (!accessToken) {
                throw new Error(`Tried to make an API call with a user context for user ID ${contextUserId} but no token was found`);
            }
            if (accessTokenIsExpired(accessToken) && authProvider.refreshAccessTokenForUser) {
                const newAccessToken = await authProvider.refreshAccessTokenForUser(contextUserId);
                return await this._callApiUsingInitialToken(options, newAccessToken, true);
            }
            return await this._callApiUsingInitialToken(options, accessToken);
        }
        const requestContextUserId = this._getUserIdFromRequestContext(options.userId);
        const accessToken = requestContextUserId === null
            ? await authProvider.getAnyAccessToken()
            : await authProvider.getAnyAccessToken(requestContextUserId ?? options.userId);
        if (accessTokenIsExpired(accessToken) && accessToken.userId && authProvider.refreshAccessTokenForUser) {
            const newAccessToken = await authProvider.refreshAccessTokenForUser(accessToken.userId);
            return await this._callApiUsingInitialToken(options, newAccessToken, true);
        }
        return await this._callApiUsingInitialToken(options, accessToken);
    }
    /**
     * The Helix bits API methods.
     */
    get bits() {
        return new HelixBitsApi(this);
    }
    /**
     * The Helix channels API methods.
     */
    get channels() {
        return new HelixChannelApi(this);
    }
    /**
     * The Helix channel points API methods.
     */
    get channelPoints() {
        return new HelixChannelPointsApi(this);
    }
    /**
     * The Helix charity API methods.
     */
    get charity() {
        return new HelixCharityApi(this);
    }
    /**
     * The Helix chat API methods.
     */
    get chat() {
        return new HelixChatApi(this);
    }
    /**
     * The Helix clips API methods.
     */
    get clips() {
        return new HelixClipApi(this);
    }
    /**
     * The Helix content classification label API methods.
     */
    get contentClassificationLabels() {
        return new HelixContentClassificationLabelApi(this);
    }
    /**
     * The Helix entitlement API methods.
     */
    get entitlements() {
        return new HelixEntitlementApi(this);
    }
    /**
     * The Helix EventSub API methods.
     */
    get eventSub() {
        return new HelixEventSubApi(this);
    }
    /**
     * The Helix extensions API methods.
     */
    get extensions() {
        return new HelixExtensionsApi(this);
    }
    /**
     * The Helix game API methods.
     */
    get games() {
        return new HelixGameApi(this);
    }
    /**
     * The Helix Hype Train API methods.
     */
    get hypeTrain() {
        return new HelixHypeTrainApi(this);
    }
    /**
     * The Helix goal API methods.
     */
    get goals() {
        return new HelixGoalApi(this);
    }
    /**
     * The Helix moderation API methods.
     */
    get moderation() {
        return new HelixModerationApi(this);
    }
    /**
     * The Helix poll API methods.
     */
    get polls() {
        return new HelixPollApi(this);
    }
    /**
     * The Helix prediction API methods.
     */
    get predictions() {
        return new HelixPredictionApi(this);
    }
    /**
     * The Helix raid API methods.
     */
    get raids() {
        return new HelixRaidApi(this);
    }
    /**
     * The Helix schedule API methods.
     */
    get schedule() {
        return new HelixScheduleApi(this);
    }
    /**
     * The Helix search API methods.
     */
    get search() {
        return new HelixSearchApi(this);
    }
    /**
     * The Helix stream API methods.
     */
    get streams() {
        return new HelixStreamApi(this);
    }
    /**
     * The Helix subscription API methods.
     */
    get subscriptions() {
        return new HelixSubscriptionApi(this);
    }
    /**
     * The Helix team API methods.
     */
    get teams() {
        return new HelixTeamApi(this);
    }
    /**
     * The Helix user API methods.
     */
    get users() {
        return new HelixUserApi(this);
    }
    /**
     * The Helix video API methods.
     */
    get videos() {
        return new HelixVideoApi(this);
    }
    /**
     * The API methods that deal with whispers.
     */
    get whispers() {
        return new HelixWhisperApi(this);
    }
    /**
     * Statistics on the rate limiter for the Helix API.
     */
    get rateLimiterStats() {
        if (this._rateLimiter instanceof ResponseBasedRateLimiter) {
            return this._rateLimiter.stats;
        }
        return null;
    }
    /** @private */
    get _authProvider() {
        return this._config.authProvider;
    }
    /** @internal */
    get _batchDelay() {
        return this._config.batchDelay ?? 0;
    }
    // null means app access, undefined means none specified
    /** @internal */
    _getUserIdFromRequestContext(contextUserId) {
        return contextUserId;
    }
    async _callApiUsingInitialToken(options, accessToken, wasRefreshed = false) {
        const { authProvider } = this._config;
        const { authorizationType } = authProvider;
        let response = await this._callApiInternal(options, authProvider.clientId, accessToken.accessToken, authorizationType);
        if (response.status === 401 && !wasRefreshed) {
            if (accessToken.userId) {
                if (authProvider.refreshAccessTokenForUser) {
                    const token = await authProvider.refreshAccessTokenForUser(accessToken.userId);
                    response = await this._callApiInternal(options, authProvider.clientId, token.accessToken, authorizationType);
                }
            }
            else if (authProvider.getAppAccessToken) {
                const token = await authProvider.getAppAccessToken(true);
                response = await this._callApiInternal(options, authProvider.clientId, token.accessToken, authorizationType);
            }
        }
        this.emit(this.onRequest, new ApiReportedRequest(options, response.status, accessToken.userId ?? null));
        await handleTwitchApiResponseError(response, options);
        return await transformTwitchApiResponse(response);
    }
    async _callApiInternal(options, clientId, accessToken, authorizationType) {
        const { fetchOptions } = this._config;
        const type = options.type ?? 'helix';
        this._logger.debug(`Calling ${type} API: ${options.method ?? 'GET'} ${options.url}`);
        this._logger.trace(`Query: ${JSON.stringify(options.query)}`);
        if (options.jsonBody) {
            this._logger.trace(`Request body: ${JSON.stringify(options.jsonBody)}`);
        }
        const op = retry.operation({
            retries: 3,
            minTimeout: 500,
            factor: 2,
        });
        const { promise, resolve, reject } = promiseWithResolvers();
        op.attempt(async () => {
            try {
                const response = type === 'helix'
                    ? await this._rateLimiter.request({
                        options,
                        clientId,
                        accessToken,
                        authorizationType,
                        fetchOptions,
                    })
                    : await callTwitchApiRaw(options, clientId, accessToken, authorizationType, fetchOptions);
                if (!response.ok && response.status >= 500 && response.status < 600) {
                    await handleTwitchApiResponseError(response, options);
                }
                resolve(response);
            }
            catch (e) {
                if (op.retry(e)) {
                    return;
                }
                reject(op.mainError());
            }
        });
        const result = await promise;
        this._logger.debug(`Called ${type} API: ${options.method ?? 'GET'} ${options.url} - result: ${result.status}`);
        return result;
    }
};
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "bits", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "channels", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "channelPoints", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "charity", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "chat", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "clips", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "contentClassificationLabels", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "entitlements", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "eventSub", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "extensions", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "games", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "hypeTrain", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "goals", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "moderation", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "polls", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "predictions", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "raids", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "schedule", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "search", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "streams", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "subscriptions", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "teams", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "users", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "videos", null);
__decorate([
    CachedGetter()
], BaseApiClient.prototype, "whispers", null);
BaseApiClient = __decorate([
    Cacheable,
    rtfm('api', 'ApiClient')
], BaseApiClient);
export { BaseApiClient };
