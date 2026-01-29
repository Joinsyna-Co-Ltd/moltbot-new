export class NotEnoughParametersError extends Error {
    constructor(_command, _expectedParams, _actualParams) {
        super(`command "${_command}" expected ${_expectedParams} or more parameters, got ${_actualParams}`);
        this._command = _command;
        this._expectedParams = _expectedParams;
        this._actualParams = _actualParams;
        Object.setPrototypeOf(this, NotEnoughParametersError.prototype);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotEnoughParametersError);
        }
    }
    get command() {
        return this._command;
    }
    get expectedParams() {
        return this._expectedParams;
    }
    get actualParams() {
        return this._actualParams;
    }
}
