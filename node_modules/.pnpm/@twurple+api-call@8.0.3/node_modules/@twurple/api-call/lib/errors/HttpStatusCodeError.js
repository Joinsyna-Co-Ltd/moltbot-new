import { CustomError } from '@twurple/common';
/**
 * Thrown whenever a HTTP error occurs. Some HTTP errors are handled in the library when they're expected.
 */
export class HttpStatusCodeError extends CustomError {
    _statusCode;
    _url;
    _method;
    _body;
    /** @private */
    constructor(_statusCode, statusText, _url, _method, _body, isJson) {
        super(`Encountered HTTP status code ${_statusCode}: ${statusText}\n\nURL: ${_url}\nMethod: ${_method}\nBody:\n${!isJson && _body.length > 150 ? `${_body.slice(0, 147)}...` : _body}`);
        this._statusCode = _statusCode;
        this._url = _url;
        this._method = _method;
        this._body = _body;
    }
    /**
     * The HTTP status code of the error.
     */
    get statusCode() {
        return this._statusCode;
    }
    /**
     * The URL that was requested.
     */
    get url() {
        return this._url;
    }
    /**
     * The HTTP method that was used for the request.
     */
    get method() {
        return this._method;
    }
    /**
     * The body that was used for the request, as a string.
     */
    get body() {
        return this._body;
    }
}
