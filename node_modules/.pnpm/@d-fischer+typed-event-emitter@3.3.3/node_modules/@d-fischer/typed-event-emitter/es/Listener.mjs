export class Listener {
    /** @private */
    constructor(owner, event, listener, 
    /** @private */ _internal = false) {
        this.owner = owner;
        this.event = event;
        this.listener = listener;
        this._internal = _internal;
    }
    unbind() {
        this.owner.removeListener(this);
    }
}
