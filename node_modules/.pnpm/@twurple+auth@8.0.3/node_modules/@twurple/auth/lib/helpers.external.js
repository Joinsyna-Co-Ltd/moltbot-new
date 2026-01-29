/** @internal */
export function createExchangeCodeQuery(clientId, clientSecret, code, redirectUri) {
    return {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
    };
}
/** @internal */
export function createGetAppTokenQuery(clientId, clientSecret) {
    return {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
    };
}
/** @internal */
export function createRefreshTokenQuery(clientId, clientSecret, refreshToken) {
    return {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
    };
}
/** @internal */
export function createRevokeTokenQuery(clientId, accessToken) {
    return {
        client_id: clientId,
        token: accessToken,
    };
}
