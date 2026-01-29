import { type TwitchApiCallOptions } from '@twurple/api-call';
/**
 * Reporting details for an API request.
 */
export declare class ApiReportedRequest {
    private readonly _options;
    private readonly _httpStatus;
    private readonly _resolvedUserId;
    /**
     * The options used to call the API.
     */
    get options(): TwitchApiCallOptions;
    /**
     * The HTTP status code returned by Twitch for the request.
     */
    get httpStatus(): number;
    /**
     * The ID of the user that was used for authentication, or `null` if an app access token was used.
     */
    get resolvedUserId(): string | null;
}
//# sourceMappingURL=ApiReportedRequest.d.ts.map