import { fibWithLimit, resolveConfigValueSync } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
export class PersistentConnection extends EventEmitter {
    constructor(_type, _target, _config = {}) {
        var _a;
        super();
        this._type = _type;
        this._target = _target;
        this._config = _config;
        this._retryLimit = Infinity;
        this._initialRetryLimit = 3;
        this._connecting = false;
        this._connectionRetryCount = 0;
        this.onReceive = this.registerEvent();
        this.onConnect = this.registerEvent();
        this.onDisconnect = this.registerEvent();
        this.onEnd = this.registerEvent();
        this._retryLimit = (_a = _config.retryLimit) !== null && _a !== void 0 ? _a : Infinity;
        this._logger = _config.logger;
    }
    get isConnected() {
        var _a, _b;
        return (_b = (_a = this._currentConnection) === null || _a === void 0 ? void 0 : _a.isConnected) !== null && _b !== void 0 ? _b : false;
    }
    get isConnecting() {
        var _a, _b;
        return (_b = (_a = this._currentConnection) === null || _a === void 0 ? void 0 : _a.isConnecting) !== null && _b !== void 0 ? _b : this._connecting;
    }
    get hasSocket() {
        var _a, _b;
        return (_b = (_a = this._currentConnection) === null || _a === void 0 ? void 0 : _a.hasSocket) !== null && _b !== void 0 ? _b : false;
    }
    sendLine(line) {
        var _a;
        (_a = this._currentConnection) === null || _a === void 0 ? void 0 : _a.sendLine(line);
    }
    connect() {
        if (this._currentConnection || this._connecting) {
            throw new Error('Connection already present');
        }
        this._connecting = true;
        this._connectionRetryCount = 0;
        this._tryConnect(true);
    }
    disconnect() {
        var _a;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`PersistentConnection disconnect currentConnectionExists:${Boolean(this._currentConnection).toString()} connecting:${this._connecting.toString()}`);
        this._connecting = false;
        if (this._currentConnection) {
            const lastConnection = this._currentConnection;
            this._currentConnection = undefined;
            lastConnection.disconnect();
        }
    }
    assumeExternalDisconnect() {
        var _a, _b;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('PersistentConnection assumeExternalDisconnect');
        (_b = this._currentConnection) === null || _b === void 0 ? void 0 : _b.assumeExternalDisconnect();
    }
    reconnect() {
        this._reconnect(true);
    }
    acknowledgeSuccessfulReconnect() {
        if (this._previousConnection) {
            this._previousConnection.disconnect();
            this._previousConnection = undefined;
        }
    }
    _startTryingToConnect(userGenerated = false) {
        this._connecting = true;
        this._connectionRetryCount = 0;
        this._tryConnect(userGenerated);
    }
    _tryConnect(userGenerated = false) {
        var _a, _b;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`PersistentConnection tryConnect currentConnectionExists:${Boolean(this._currentConnection).toString()} connecting:${this._connecting.toString()}`);
        const retryLimit = userGenerated ? this._initialRetryLimit : this._retryLimit;
        (_b = this._retryTimerGenerator) !== null && _b !== void 0 ? _b : (this._retryTimerGenerator = fibWithLimit(120));
        const newConnection = (this._currentConnection = new this._type(resolveConfigValueSync(this._target), this._config));
        newConnection.onReceive(line => this.emit(this.onReceive, line));
        newConnection.onConnect(() => {
            this.emit(this.onConnect);
            this._connecting = false;
            this._retryTimerGenerator = undefined;
        });
        newConnection.onDisconnect((manually, reason) => {
            var _a, _b, _c;
            this.emit(this.onDisconnect, manually, reason);
            if (manually) {
                this.emit(this.onEnd, true);
                this._connecting = false;
                this._retryTimerGenerator = undefined;
                newConnection.disconnect();
                if (this._currentConnection === newConnection) {
                    this._currentConnection = undefined;
                }
                if (this._previousConnection === newConnection) {
                    this._previousConnection = undefined;
                }
            }
            else if (this._connecting) {
                (_a = this._logger) === null || _a === void 0 ? void 0 : _a.debug(`Connection error caught: ${(_b = reason === null || reason === void 0 ? void 0 : reason.message) !== null && _b !== void 0 ? _b : 'unknown error'}`);
                if (this._connectionRetryCount >= retryLimit) {
                    return;
                }
                this._connectionRetryCount++;
                const secs = this._retryTimerGenerator.next().value;
                if (secs !== 0) {
                    (_c = this._logger) === null || _c === void 0 ? void 0 : _c.info(`Retrying in ${secs} seconds`);
                }
                setTimeout(() => {
                    var _a;
                    if (!this._connecting) {
                        return;
                    }
                    (_a = this._logger) === null || _a === void 0 ? void 0 : _a.info(userGenerated ? 'Retrying connection' : 'Trying to reconnect');
                    this._tryConnect();
                }, secs * 1000);
            }
            else {
                this._reconnect();
            }
        });
        newConnection.connect();
    }
    _reconnect(userGenerated = false) {
        if (userGenerated && this._config.overlapManualReconnect) {
            this._previousConnection = this._currentConnection;
            this._currentConnection = undefined;
        }
        else {
            this.disconnect();
        }
        this._startTryingToConnect(userGenerated);
    }
}
