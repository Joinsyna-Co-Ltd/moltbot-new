"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollector = void 0;
class MessageCollector {
    constructor(_client, _originalMessage, ...types) {
        this._client = _client;
        this._originalMessage = _originalMessage;
        this._messages = [];
        this._endEventHandlers = new Map();
        this._types = new Set(types);
    }
    untilEvent(eventType) {
        this._cleanEndEventHandler(eventType);
        const listener = this._client.on(eventType, () => this.end());
        this._endEventHandlers.set(eventType, listener);
    }
    async promise() {
        this._promise || (this._promise = new Promise(resolve => {
            this._promiseResolve = resolve;
        }));
        return await this._promise;
    }
    collect(message) {
        if (!this._originalMessage._acceptsInReplyCollection(message)) {
            return false;
        }
        this._messages.push(message);
        if (message.endsResponseTo(this._originalMessage)) {
            this.end();
        }
        return true;
    }
    end() {
        this._client.stopCollect(this);
        this._cleanEndEventHandlers();
        if (this._promiseResolve) {
            this._promiseResolve(this._messages);
        }
    }
    _cleanEndEventHandlers() {
        this._endEventHandlers.forEach(listener => {
            this._client.removeListener(listener);
        });
        this._endEventHandlers.clear();
    }
    _cleanEndEventHandler(eventType) {
        if (this._endEventHandlers.has(eventType)) {
            this._client.removeListener(this._endEventHandlers.get(eventType));
            this._endEventHandlers.delete(eventType);
        }
    }
}
exports.MessageCollector = MessageCollector;
