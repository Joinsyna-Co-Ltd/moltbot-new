import { DataObject } from '@twurple/common';
import { type HelixChatBadgeVersionData } from '../../interfaces/endpoints/chat.external.js';
import { type HelixChatBadgeScale } from '../../interfaces/endpoints/chat.input.js';
/**
 * A version of a chat badge.
 */
export declare class HelixChatBadgeVersion extends DataObject<HelixChatBadgeVersionData> {
    /**
     * The badge version ID.
     */
    get id(): string;
    /**
     * Gets an image URL for the given scale.
     *
     * @param scale The scale of the badge image.
     */
    getImageUrl(scale: HelixChatBadgeScale): string;
    /**
     * The title of the badge.
     */
    get title(): string;
    /**
     * The description of the badge.
     */
    get description(): string;
    /**
     * The action to take when clicking on the badge. Set to `null` if no action is specified.
     */
    get clickAction(): string | null;
    /**
     * The URL to navigate to when clicking on the badge. Set to `null` if no URL is specified.
     */
    get clickUrl(): string | null;
}
//# sourceMappingURL=HelixChatBadgeVersion.d.ts.map