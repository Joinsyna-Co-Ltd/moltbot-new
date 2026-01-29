import { __decorate } from "tslib";
import { isNode } from '@d-fischer/detect-node';
import { createLogger } from '@d-fischer/logger';
import { PartitionedRateLimiter, PartitionedTimeBasedRateLimiter } from '@d-fischer/rate-limiter';
import { callTwitchApiRaw } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { ConfigError } from '../errors/ConfigError.js';
import { HelixRateLimiter } from '../utils/HelixRateLimiter.js';
import { BaseApiClient } from './BaseApiClient.js';
import { NoContextApiClient } from './NoContextApiClient.js';
import { UserContextApiClient } from './UserContextApiClient.js';
/**
 * An API client for the Twitch Helix API and other miscellaneous endpoints.
 *
 * @meta category main
 * @hideProtected
 */
let ApiClient = class ApiClient extends BaseApiClient {
    /**
     * Creates a new API client instance.
     *
     * @param config Configuration for the client instance.
     */
    constructor(config) {
        if (!config.authProvider) {
            throw new ConfigError('No auth provider given. Please supply the `authProvider` option.');
        }
        const rateLimitLoggerOptions = { name: 'twurple:api:rate-limiter', ...config.logger };
        super(config, createLogger({ name: 'twurple:api:client', ...config.logger }), isNode
            ? new PartitionedRateLimiter({
                getPartitionKey: req => req.userId ?? null,
                createChild: () => new HelixRateLimiter({ logger: rateLimitLoggerOptions }),
            })
            : new PartitionedTimeBasedRateLimiter({
                logger: rateLimitLoggerOptions,
                bucketSize: 800,
                timeFrame: 64000,
                doRequest: async ({ options, clientId, accessToken, authorizationType, fetchOptions, }) => await callTwitchApiRaw(options, clientId, accessToken, authorizationType, fetchOptions),
                getPartitionKey: req => req.userId ?? null,
            }));
    }
    /**
     * Creates a contextualized ApiClient that can be used to call the API in the context of a given user.
     *
     * @param user The user to use as context.
     * @param runner The callback to execute.
     *
     * A parameter is passed that should be used in place of the normal `ApiClient`
     * to ensure that all requests are executed in the given user's context.
     *
     * Please note that requests which require scope authorization ignore this context.
     *
     * The return value of your callback will be propagated to the return value of this method.
     */
    async asUser(user, runner) {
        const ctx = new UserContextApiClient(this._config, this._logger, this._rateLimiter, extractUserId(user));
        return await runner(ctx);
    }
    /**
     * Creates a contextualized ApiClient that can be used to call the API in the context of a given intent.
     *
     * @param intents A list of intents. The first one that is found in your auth provider will be used.
     * @param runner The callback to execute.
     *
     * A parameter is passed that should be used in place of the normal `ApiClient`
     * to ensure that all requests are executed in the given user's context.
     *
     * Please note that requests which require scope authorization ignore this context.
     *
     * The return value of your callback will be propagated to the return value of this method.
     */
    async asIntent(intents, runner) {
        if (!this._authProvider.getAccessTokenForIntent) {
            throw new Error('Trying to use intents with an auth provider that does not support them');
        }
        for (const intent of intents) {
            const user = await this._authProvider.getAccessTokenForIntent(intent);
            if (user) {
                const ctx = new UserContextApiClient(this._config, this._logger, this._rateLimiter, user.userId);
                return await runner(ctx);
            }
        }
        throw new Error(`Intents [${intents.join(', ')}] not found in auth provider`);
    }
    /**
     * Creates a contextualized ApiClient that can be used to call the API without the context of any user.
     *
     * This usually means that an app access token is used.
     *
     * @param runner The callback to execute.
     *
     * A parameter is passed that should be used in place of the normal `ApiClient`
     * to ensure that all requests are executed without user context.
     *
     * Please note that requests which require scope authorization ignore this context erasure.
     *
     * The return value of your callback will be propagated to the return value of this method.
     */
    async withoutUser(runner) {
        const ctx = new NoContextApiClient(this._config, this._logger, this._rateLimiter);
        return await runner(ctx);
    }
};
ApiClient = __decorate([
    rtfm('api', 'ApiClient')
], ApiClient);
export { ApiClient };
