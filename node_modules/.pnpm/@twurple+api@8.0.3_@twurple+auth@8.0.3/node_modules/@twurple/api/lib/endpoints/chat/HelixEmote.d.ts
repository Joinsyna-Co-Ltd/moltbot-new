import { type HelixEmoteImageScale } from '../../interfaces/endpoints/chat.external.js';
import { HelixEmoteBase } from './HelixEmoteBase.js';
/**
 * A Twitch emote.
 */
export declare class HelixEmote extends HelixEmoteBase {
    /**
     * Gets the URL of the emote image in the given scale.
     *
     * @param scale The scale of the image.
     */
    getImageUrl(scale: HelixEmoteImageScale): string;
}
//# sourceMappingURL=HelixEmote.d.ts.map