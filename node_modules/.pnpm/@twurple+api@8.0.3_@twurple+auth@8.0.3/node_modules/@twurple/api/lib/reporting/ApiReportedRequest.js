/**
 * Reporting details for an API request.
 */
export class ApiReportedRequest {
    _options;
    _httpStatus;
    _resolvedUserId;
    /** @internal */
    constructor(_options, _httpStatus, _resolvedUserId) {
        this._options = _options;
        this._httpStatus = _httpStatus;
        this._resolvedUserId = _resolvedUserId;
    }
    /**
     * The options used to call the API.
     */
    get options() {
        return this._options;
    }
    /**
     * The HTTP status code returned by Twitch for the request.
     */
    get httpStatus() {
        return this._httpStatus;
    }
    /**
     * The ID of the user that was used for authentication, or `null` if an app access token was used.
     */
    get resolvedUserId() {
        return this._resolvedUserId;
    }
}
