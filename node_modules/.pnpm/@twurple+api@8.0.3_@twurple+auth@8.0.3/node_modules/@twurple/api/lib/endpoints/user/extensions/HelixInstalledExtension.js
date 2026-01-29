import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { HelixBaseExtension } from './HelixBaseExtension.js';
/**
 * A Twitch Extension that is installed in a slot of a channel.
 *
 * @inheritDoc
 */
let HelixInstalledExtension = class HelixInstalledExtension extends HelixBaseExtension {
    _slotType;
    _slotId;
    /** @internal */
    constructor(slotType, slotId, data) {
        super(data);
        this._slotType = slotType;
        this._slotId = slotId;
    }
    /**
     * The type of the slot the extension is in.
     */
    get slotType() {
        return this._slotType;
    }
    /**
     * The ID of the slot the extension is in.
     */
    get slotId() {
        return this._slotId;
    }
};
HelixInstalledExtension = __decorate([
    rtfm('api', 'HelixInstalledExtension', 'id')
], HelixInstalledExtension);
export { HelixInstalledExtension };
