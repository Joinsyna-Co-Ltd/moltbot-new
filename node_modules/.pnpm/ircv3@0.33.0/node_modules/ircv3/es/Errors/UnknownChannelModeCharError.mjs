export class UnknownChannelModeCharError extends Error {
    constructor(_char) {
        super(`Unknown channel mode character ${_char}`);
        this._char = _char;
        Object.setPrototypeOf(this, UnknownChannelModeCharError.prototype);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnknownChannelModeCharError);
        }
    }
    get char() {
        return this._char;
    }
}
