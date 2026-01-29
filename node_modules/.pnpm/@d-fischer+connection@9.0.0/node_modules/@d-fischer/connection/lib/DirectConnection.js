"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectConnection = void 0;
const net_1 = require("net");
const tls = require("tls");
const AbstractConnection_1 = require("./AbstractConnection");
class DirectConnection extends AbstractConnection_1.AbstractConnection {
    constructor(target, options) {
        var _a;
        super(options);
        this._socket = null;
        this._closingOnDemand = false;
        this._hadError = false;
        if (!target.hostName || !target.port) {
            throw new Error('DirectConnection requires hostName and port to be set');
        }
        this._host = target.hostName;
        this._port = target.port;
        this._secure = (_a = target.secure) !== null && _a !== void 0 ? _a : true;
    }
    get hasSocket() {
        return !!this._socket;
    }
    sendRaw(line) {
        var _a;
        (_a = this._socket) === null || _a === void 0 ? void 0 : _a.write(line);
    }
    connect() {
        var _a;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('DirectConnection connect');
        this._connecting = true;
        if (this._secure) {
            this._socket = tls.connect(this._port, this._host);
        }
        else {
            this._socket = new net_1.Socket();
            this._socket.connect(this._port, this._host);
        }
        this._socket.on('connect', () => {
            var _a;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('DirectConnection onConnect');
            this._connecting = false;
            this._connected = true;
            this._closingOnDemand = false;
            this._hadError = false;
            this.emit(this.onConnect);
        });
        this._socket.on('error', (err) => {
            var _a;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`DirectConnection onError message:${err.message}`);
            this._connected = false;
            this._connecting = false;
            this.emit(this.onDisconnect, false, err);
            this._hadError = true;
        });
        this._socket.on('data', (data) => {
            this.receiveRaw(data.toString());
        });
        this._socket.on('close', () => {
            var _a;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`DirectConnection onClose closingOnDemand:${this._closingOnDemand.toString()} hadError:${this._hadError.toString()}`);
            if (!this._hadError) {
                this._connected = false;
                this._connecting = false;
                this.emit(this.onDisconnect, this._closingOnDemand);
            }
            this._closingOnDemand = false;
            this._hadError = false;
            this.clearSocket();
        });
    }
    disconnect() {
        var _a, _b;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('DirectConnection disconnect');
        this._closingOnDemand = true;
        (_b = this._socket) === null || _b === void 0 ? void 0 : _b.end();
    }
    clearSocket() {
        if (this._socket) {
            this._socket.removeAllListeners('connect');
            this._socket.removeAllListeners('error');
            this._socket.removeAllListeners('data');
            this._socket.removeAllListeners('close');
            this._socket = null;
        }
    }
}
exports.DirectConnection = DirectConnection;
