import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A version of a chat badge.
 */
let HelixChatBadgeVersion = class HelixChatBadgeVersion extends DataObject {
    /**
     * The badge version ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * Gets an image URL for the given scale.
     *
     * @param scale The scale of the badge image.
     */
    getImageUrl(scale) {
        return this[rawDataSymbol][`image_url_${scale}x`];
    }
    /**
     * The title of the badge.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The description of the badge.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
    /**
     * The action to take when clicking on the badge. Set to `null` if no action is specified.
     */
    get clickAction() {
        return this[rawDataSymbol].click_action;
    }
    /**
     * The URL to navigate to when clicking on the badge. Set to `null` if no URL is specified.
     */
    get clickUrl() {
        return this[rawDataSymbol].click_url;
    }
};
HelixChatBadgeVersion = __decorate([
    rtfm('api', 'HelixChatBadgeVersion', 'id')
], HelixChatBadgeVersion);
export { HelixChatBadgeVersion };
