import { WebSocket } from '@d-fischer/isomorphic-ws';
import { AbstractConnection } from "./AbstractConnection.mjs";
export class WebSocketConnection extends AbstractConnection {
    constructor(target, options) {
        super(options);
        this._socket = null;
        this._closingOnDemand = false;
        if (target.hostName && target.port) {
            this._url = `ws${target.secure ? 's' : ''}://${target.hostName}:${target.port}`;
        }
        else if (target.url) {
            this._url = target.url;
        }
        else {
            throw new Error('WebSocketConnection requires either hostName & port or url to be set');
        }
    }
    get hasSocket() {
        return !!this._socket;
    }
    sendRaw(line) {
        var _a;
        (_a = this._socket) === null || _a === void 0 ? void 0 : _a.send(line);
    }
    connect() {
        var _a, _b;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('WebSocketConnection connect');
        this._connecting = true;
        this._socket = new WebSocket(this._url, (_b = this._additionalOptions) === null || _b === void 0 ? void 0 : _b.wsOptions);
        this._socket.onopen = () => {
            var _a;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('WebSocketConnection onOpen');
            this._connected = true;
            this._connecting = false;
            this._closingOnDemand = false;
            this.emit(this.onConnect);
        };
        this._socket.onmessage = ({ data }) => {
            this.receiveRaw(data.toString());
        };
        // The following empty error callback needs to exist so connection errors are passed down to `onclose` down below - otherwise the process just crashes instead
        this._socket.onerror = e => {
            var _a;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`WebSocketConnection onError message:${e.message}`);
        };
        this._socket.onclose = e => {
            var _a;
            const wasConnected = this._connected;
            const wasConnecting = this._connecting;
            (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace(`WebSocketConnection onClose wasConnected:${wasConnected.toString()} wasConnecting:${wasConnecting.toString()} closingOnDemand:${this._closingOnDemand.toString()} wasClean:${e.wasClean.toString()}`);
            this._connected = false;
            this._connecting = false;
            if (this._closingOnDemand) {
                this._closingOnDemand = false;
                this.emit(this.onDisconnect, true);
                this.emit(this.onEnd, true);
            }
            else {
                const err = new Error(`[${e.code}] ${e.reason}`);
                this.emit(this.onDisconnect, false, err);
                this.emit(this.onEnd, false, err);
            }
            this.clearSocket();
        };
    }
    disconnect() {
        var _a, _b;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.trace('WebSocketConnection disconnect');
        this._closingOnDemand = true;
        (_b = this._socket) === null || _b === void 0 ? void 0 : _b.close();
    }
    clearSocket() {
        if (this._socket) {
            this._socket.onopen = null;
            this._socket.onmessage = null;
            this._socket.onerror = null;
            this._socket.onclose = null;
            this._socket = null;
        }
    }
}
