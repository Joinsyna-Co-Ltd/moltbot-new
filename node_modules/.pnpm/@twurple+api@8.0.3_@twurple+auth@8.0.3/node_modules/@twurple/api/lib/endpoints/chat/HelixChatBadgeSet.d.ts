import { DataObject } from '@twurple/common';
import { type HelixChatBadgeSetData } from '../../interfaces/endpoints/chat.external.js';
import { HelixChatBadgeVersion } from './HelixChatBadgeVersion.js';
/**
 * A version of a chat badge.
 */
export declare class HelixChatBadgeSet extends DataObject<HelixChatBadgeSetData> {
    /**
     * The badge set ID.
     */
    get id(): string;
    /**
     * All versions of the badge.
     */
    get versions(): HelixChatBadgeVersion[];
    /**
     * Gets a specific version of the badge.
     *
     * @param versionId The ID of the version.
     */
    getVersion(versionId: string): HelixChatBadgeVersion | null;
}
//# sourceMappingURL=HelixChatBadgeSet.d.ts.map