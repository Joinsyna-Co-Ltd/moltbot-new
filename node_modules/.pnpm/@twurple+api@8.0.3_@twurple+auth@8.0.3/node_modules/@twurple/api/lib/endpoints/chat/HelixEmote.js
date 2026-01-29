import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixEmoteBase } from './HelixEmoteBase.js';
/**
 * A Twitch emote.
 */
let HelixEmote = class HelixEmote extends HelixEmoteBase {
    /**
     * Gets the URL of the emote image in the given scale.
     *
     * @param scale The scale of the image.
     */
    getImageUrl(scale) {
        return this[rawDataSymbol].images[`url_${scale}x`];
    }
};
HelixEmote = __decorate([
    rtfm('api', 'HelixEmote', 'id')
], HelixEmote);
export { HelixEmote };
