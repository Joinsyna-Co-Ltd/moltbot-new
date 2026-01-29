import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * The status of a message that says whether it is permitted by AutoMod or not.
 */
let HelixAutoModStatus = class HelixAutoModStatus extends DataObject {
    /**
     * The developer-generated ID that was sent with the request data.
     */
    get messageId() {
        return this[rawDataSymbol].msg_id;
    }
    /**
     * Whether the message is permitted by AutoMod or not.
     */
    get isPermitted() {
        return this[rawDataSymbol].is_permitted;
    }
};
HelixAutoModStatus = __decorate([
    rtfm('api', 'HelixAutoModStatus', 'messageId')
], HelixAutoModStatus);
export { HelixAutoModStatus };
