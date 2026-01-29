import { DataObject } from '@twurple/common';
import type { HelixShieldModeStatusData } from '../../interfaces/endpoints/moderation.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * Information about the Shield Mode status of a channel.
 */
export declare class HelixShieldModeStatus extends DataObject<HelixShieldModeStatusData> {
    /**
     * Whether Shield Mode is active.
     */
    get isActive(): boolean;
    /**
     * The ID of the moderator that last activated Shield Mode.
     */
    get moderatorId(): string;
    /**
     * The name of the moderator that last activated Shield Mode.
     */
    get moderatorName(): string;
    /**
     * The display name of the moderator that last activated Shield Mode.
     */
    get moderatorDisplayName(): string;
    /**
     * Gets more information about the moderator that last activated Shield Mode.
     */
    getModerator(): Promise<HelixUser>;
    /**
     * The date when Shield Mode was last activated. `null` indicates Shield Mode hasn't been previously activated.
     */
    get lastActivationDate(): Date | null;
}
//# sourceMappingURL=HelixShieldModeStatus.d.ts.map