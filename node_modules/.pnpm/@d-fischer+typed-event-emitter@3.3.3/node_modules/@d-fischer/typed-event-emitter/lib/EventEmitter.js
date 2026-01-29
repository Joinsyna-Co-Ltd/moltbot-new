"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const Listener_1 = require("./Listener");
class EventEmitter {
    constructor() {
        this._eventListeners = new Map();
        this._internalEventListeners = new Map();
    }
    on(event, listener) {
        return this._addListener(false, event, listener);
    }
    addListener(event, listener) {
        return this._addListener(false, event, listener);
    }
    removeListener(idOrEvent, listener) {
        this._removeListener(false, idOrEvent, listener);
    }
    registerEvent() {
        const eventBinder = (handler) => this.addListener(eventBinder, handler);
        return eventBinder;
    }
    emit(event, ...args) {
        if (this._eventListeners.has(event)) {
            for (const listener of this._eventListeners.get(event)) {
                listener(...args);
            }
        }
        if (this._internalEventListeners.has(event)) {
            for (const listener of this._internalEventListeners.get(event)) {
                listener(...args);
            }
        }
    }
    registerInternalEvent() {
        const eventBinder = (handler) => this.addInternalListener(eventBinder, handler);
        return eventBinder;
    }
    addInternalListener(event, listener) {
        return this._addListener(true, event, listener);
    }
    removeInternalListener(idOrEvent, listener) {
        this._removeListener(true, idOrEvent, listener);
    }
    _addListener(internal, event, listener) {
        const listenerMap = internal ? this._eventListeners : this._internalEventListeners;
        if (listenerMap.has(event)) {
            listenerMap.get(event).push(listener);
        }
        else {
            listenerMap.set(event, [listener]);
        }
        return new Listener_1.Listener(this, event, listener, internal);
    }
    _removeListener(internal, idOrEvent, listener) {
        const listenerMap = internal ? this._eventListeners : this._internalEventListeners;
        if (!idOrEvent) {
            listenerMap.clear();
        }
        else if (typeof idOrEvent === 'object') {
            const id = idOrEvent;
            this._removeListener(id._internal, id.event, id.listener);
        }
        else {
            const event = idOrEvent;
            if (listenerMap.has(event)) {
                if (listener) {
                    const listeners = listenerMap.get(event);
                    let idx = 0;
                    while ((idx = listeners.indexOf(listener)) !== -1) {
                        listeners.splice(idx, 1);
                    }
                }
                else {
                    listenerMap.delete(event);
                }
            }
        }
    }
}
exports.EventEmitter = EventEmitter;
