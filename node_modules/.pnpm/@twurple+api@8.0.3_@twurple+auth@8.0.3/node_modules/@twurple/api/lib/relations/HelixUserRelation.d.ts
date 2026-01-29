import { DataObject } from '@twurple/common';
import type { HelixUser } from '../endpoints/user/HelixUser.js';
import { type HelixUserRelationData } from '../interfaces/endpoints/generic.external.js';
/**
 * A relation of anything with a user.
 */
export declare class HelixUserRelation extends DataObject<HelixUserRelationData> {
    /**
     * The ID of the user.
     */
    get id(): string;
    /**
     * The name of the user.
     */
    get name(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * Gets additional information about the user.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixUserRelation.d.ts.map