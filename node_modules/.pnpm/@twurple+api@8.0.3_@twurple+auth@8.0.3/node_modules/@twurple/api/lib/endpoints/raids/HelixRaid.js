import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A result of a successful raid initiation.
 */
let HelixRaid = class HelixRaid extends DataObject {
    /**
     * The date when the raid was initiated.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * Whether the raid target channel is intended for mature audiences.
     */
    get targetIsMature() {
        return this[rawDataSymbol].is_mature;
    }
};
HelixRaid = __decorate([
    rtfm('api', 'HelixRaid')
], HelixRaid);
export { HelixRaid };
