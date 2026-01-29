import { qsStringify } from '@twurple/common';
import { handleTwitchApiResponseError, transformTwitchApiResponse } from './helpers/transform.js';
import { getTwitchApiUrl } from './helpers/url.js';
/**
 * Makes a call to the Twitch API using the given credentials, returning the raw Response object.
 *
 * @param options The configuration of the call.
 * @param clientId The client ID of your application.
 * @param accessToken The access token to call the API with.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 * @param authorizationType The type of Authorization header to send.
 *
 * Defaults to "Bearer" for Helix and "OAuth" for everything else.
 * @param fetchOptions Additional options to be passed to the `fetch` function.
 */
export async function callTwitchApiRaw(options, clientId, accessToken, authorizationType, fetchOptions = {}) {
    const type = options.type ?? 'helix';
    const url = getTwitchApiUrl(options.url, type);
    const params = qsStringify(options.query);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new Headers({ Accept: 'application/json' });
    let body = undefined;
    if (options.jsonBody) {
        body = JSON.stringify(options.jsonBody);
        headers.append('Content-Type', 'application/json');
    }
    if (clientId && type !== 'auth') {
        headers.append('Client-ID', clientId);
    }
    if (accessToken) {
        headers.append('Authorization', `${type === 'helix' ? authorizationType ?? 'Bearer' : 'OAuth'} ${accessToken}`);
    }
    const requestOptions = {
        ...fetchOptions,
        method: options.method ?? 'GET',
        headers,
        body,
    };
    return await fetch(`${url}${params}`, requestOptions);
}
/**
 * Makes a call to the Twitch API using given credentials.
 *
 * @param options The configuration of the call.
 * @param clientId The client ID of your application.
 * @param accessToken The access token to call the API with.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 * @param authorizationType The type of Authorization header to send.
 *
 * Defaults to "Bearer" for Helix and "OAuth" for everything else.
 * @param fetchOptions Additional options to be passed to the `fetch` function.
 */
export async function callTwitchApi(options, clientId, accessToken, authorizationType, fetchOptions = {}) {
    const response = await callTwitchApiRaw(options, clientId, accessToken, authorizationType, fetchOptions);
    await handleTwitchApiResponseError(response, options);
    return await transformTwitchApiResponse(response);
}
