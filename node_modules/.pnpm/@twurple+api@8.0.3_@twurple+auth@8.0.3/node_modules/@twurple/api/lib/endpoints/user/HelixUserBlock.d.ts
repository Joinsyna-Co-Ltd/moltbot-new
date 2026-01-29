import { DataObject } from '@twurple/common';
import { type HelixUserBlockData } from '../../interfaces/endpoints/user.external.js';
import type { HelixUser } from './HelixUser.js';
/**
 * An user blocked by a previously given user.
 */
export declare class HelixUserBlock extends DataObject<HelixUserBlockData> {
    /**
     * The ID of the blocked user.
     */
    get userId(): string;
    /**
     * The name of the blocked user.
     */
    get userName(): string;
    /**
     * The display name of the blocked user.
     */
    get userDisplayName(): string;
    /**
     * Gets additional information about the blocked user.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixUserBlock.d.ts.map