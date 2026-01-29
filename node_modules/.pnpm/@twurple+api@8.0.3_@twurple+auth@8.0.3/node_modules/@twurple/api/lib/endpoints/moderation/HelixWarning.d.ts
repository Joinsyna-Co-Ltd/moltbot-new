import { DataObject } from '@twurple/common';
import { type HelixWarningData } from '../../interfaces/endpoints/moderation.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * Information about the warning.
 */
export declare class HelixWarning extends DataObject<HelixWarningData> {
    /**
     * The ID of the channel in which the warning will take effect.
     */
    get broadcasterId(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The ID of the user who applied the warning.
     */
    get moderatorId(): string;
    /**
     * Gets more information about the moderator.
     */
    getModerator(): Promise<HelixUser>;
    /**
     * The ID of the warned user.
     */
    get userId(): string;
    /**
     * Gets more information about the user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The reason provided for the warning.
     */
    get reason(): string;
}
//# sourceMappingURL=HelixWarning.d.ts.map