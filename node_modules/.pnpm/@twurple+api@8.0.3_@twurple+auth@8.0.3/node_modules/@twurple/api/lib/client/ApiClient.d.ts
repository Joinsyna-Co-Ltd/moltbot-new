import { type LoggerOptions } from '@d-fischer/logger';
import { type TwitchApiCallFetchOptions } from '@twurple/api-call';
import { type AuthProvider } from '@twurple/auth';
import { type UserIdResolvable } from '@twurple/common';
import { BaseApiClient } from './BaseApiClient.js';
import { type ContextApiCallOptions } from './ContextApiCallOptions.js';
/**
 * Configuration for an {@link ApiClient} instance.
 */
export interface ApiConfig {
    /**
     * An authentication provider that supplies tokens to the client.
     *
     * For more information, see the {@link AuthProvider} documentation.
     */
    authProvider: AuthProvider;
    /**
     * Additional options to pass to the fetch method.
     */
    fetchOptions?: TwitchApiCallFetchOptions;
    /**
     * Options to pass to the logger.
     */
    logger?: Partial<LoggerOptions>;
    /**
     * The time that should be waited before a batch is executed, in milliseconds.
     *
     * Defaults to 0 (executes immediately after all synchronous tasks are finished).
     */
    batchDelay?: number;
}
/** @private */
export interface TwitchApiCallOptionsInternal {
    options: ContextApiCallOptions;
    clientId?: string;
    userId?: string;
    accessToken?: string;
    authorizationType?: string;
    fetchOptions?: TwitchApiCallFetchOptions;
}
/**
 * An API client for the Twitch Helix API and other miscellaneous endpoints.
 *
 * @meta category main
 * @hideProtected
 */
export declare class ApiClient extends BaseApiClient {
    /**
     * Creates a new API client instance.
     *
     * @param config Configuration for the client instance.
     */
    constructor(config: ApiConfig);
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
    asUser<T>(user: UserIdResolvable, runner: (ctx: BaseApiClient) => Promise<T>): Promise<T>;
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
    asIntent<T>(intents: string[], runner: (ctx: BaseApiClient) => Promise<T>): Promise<T>;
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
    withoutUser<T>(runner: (ctx: BaseApiClient) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=ApiClient.d.ts.map