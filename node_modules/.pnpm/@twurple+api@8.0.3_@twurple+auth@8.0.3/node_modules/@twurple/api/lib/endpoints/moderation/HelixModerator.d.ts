import { DataObject } from '@twurple/common';
import { type HelixModeratorData } from '../../interfaces/endpoints/moderation.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * Information about the moderator status of a user.
 */
export declare class HelixModerator extends DataObject<HelixModeratorData> {
    /**
     * The ID of the user.
     */
    get userId(): string;
    /**
     * The name of the user.
     */
    get userName(): string;
    /**
     * The display name of the user.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the user.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixModerator.d.ts.map