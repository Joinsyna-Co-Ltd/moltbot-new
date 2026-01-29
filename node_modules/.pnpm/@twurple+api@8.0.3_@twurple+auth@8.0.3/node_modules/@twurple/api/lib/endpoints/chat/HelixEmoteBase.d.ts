import { DataObject } from '@twurple/common';
import { type HelixEmoteBaseData, type HelixEmoteFormat, type HelixEmoteScale, type HelixEmoteThemeMode } from '../../interfaces/endpoints/chat.external.js';
/** @private */
export declare class HelixEmoteBase extends DataObject<HelixEmoteBaseData> {
    /**
     * The ID of the emote.
     */
    get id(): string;
    /**
     * The name of the emote.
     */
    get name(): string;
    /**
     * The formats that the emote is available in.
     */
    get formats(): HelixEmoteFormat[];
    /**
     * The scales that the emote is available in.
     */
    get scales(): HelixEmoteScale[];
    /**
     * The theme modes that the emote is available in.
     */
    get themeModes(): HelixEmoteThemeMode[];
    /**
     * Gets the URL of the emote image in static format at the given scale and theme mode, or null if a static emote image at that scale/theme mode doesn't exist.
     *
     * @param scale The scale of the image.
     * @param themeMode The theme mode of the image, either `light` or `dark`.
     */
    getStaticImageUrl(scale?: HelixEmoteScale, themeMode?: HelixEmoteThemeMode): string | null;
    /**
     * Gets the URL of the emote image in animated format at the given scale and theme mode, or null if an animated emote image at that scale/theme mode doesn't exist.
     *
     * @param scale The scale of the image.
     * @param themeMode The theme mode of the image, either `light` or `dark`.
     */
    getAnimatedImageUrl(scale?: HelixEmoteScale, themeMode?: HelixEmoteThemeMode): string | null;
    /**
     * Gets the URL of the emote image in the given scale, format, and theme mode.
     *
     * @param scale The scale of the image, either `1.0` (small), `2.0` (medium), or `3.0` (large).
     * @param format The format of the image, either `static` or `animated`.
     * @param themeMode The theme mode of the image, either `light` or `dark`.
     */
    getFormattedImageUrl(scale?: HelixEmoteScale, format?: HelixEmoteFormat, themeMode?: HelixEmoteThemeMode): string;
}
//# sourceMappingURL=HelixEmoteBase.d.ts.map