import { EventEmitter } from '@d-fischer/typed-event-emitter';
export class AbstractConnection extends EventEmitter {
    constructor({ lineBased, logger, additionalOptions } = {}) {
        super();
        this._currentLine = '';
        this._connecting = false;
        this._connected = false;
        this.onReceive = this.registerEvent();
        this.onConnect = this.registerEvent();
        this.onDisconnect = this.registerEvent();
        this.onEnd = this.registerEvent();
        this._lineBased = lineBased !== null && lineBased !== void 0 ? lineBased : false;
        this._logger = logger;
        this._additionalOptions = additionalOptions;
    }
    get isConnecting() {
        return this._connecting;
    }
    get isConnected() {
        return this._connected;
    }
    sendLine(line) {
        if (this._connected) {
            line = line.replace(/[\0\r\n]/g, '');
            this.sendRaw(`${line}\r\n`);
        }
    }
    assumeExternalDisconnect() {
        var _a;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('AbstractConnection assumeExternalDisconnect');
        this._connected = false;
        this._connecting = false;
        this.clearSocket();
        this.emit(this.onDisconnect, false);
    }
    receiveRaw(data) {
        var _a, _b;
        if (!this._lineBased) {
            this.emit(this.onReceive, data);
            return;
        }
        const receivedLines = data.split('\r\n');
        this._currentLine += (_a = receivedLines.shift()) !== null && _a !== void 0 ? _a : '';
        if (receivedLines.length) {
            this.emit(this.onReceive, this._currentLine);
            this._currentLine = (_b = receivedLines.pop()) !== null && _b !== void 0 ? _b : '';
            for (const line of receivedLines) {
                this.emit(this.onReceive, line);
            }
        }
    }
}
