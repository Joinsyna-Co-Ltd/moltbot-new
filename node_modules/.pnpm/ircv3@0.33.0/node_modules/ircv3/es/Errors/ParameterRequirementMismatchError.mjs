export class ParameterRequirementMismatchError extends Error {
    constructor(_command, _paramName, _paramSpec, _givenValue) {
        var _a;
        super(`required parameter "${_paramName}" did not validate against ${(_a = _paramSpec.type) !== null && _a !== void 0 ? _a : 'regex'} validation: "${_givenValue}"`);
        this._command = _command;
        this._paramName = _paramName;
        this._paramSpec = _paramSpec;
        this._givenValue = _givenValue;
        Object.setPrototypeOf(this, ParameterRequirementMismatchError.prototype);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParameterRequirementMismatchError);
        }
    }
    get command() {
        return this._command;
    }
    get paramName() {
        return this._paramName;
    }
    get paramSpec() {
        return this._paramSpec;
    }
    get givenValue() {
        return this._givenValue;
    }
}
