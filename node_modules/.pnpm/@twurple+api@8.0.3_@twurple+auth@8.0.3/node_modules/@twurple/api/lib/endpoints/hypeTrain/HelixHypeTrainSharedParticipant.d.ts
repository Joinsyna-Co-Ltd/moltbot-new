import { DataObject } from '@twurple/common';
import { type HelixHypeTrainSharedParticipantData } from '../../interfaces/endpoints/hypeTrain.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A participant of a shared Hype Train.
 */
export declare class HelixHypeTrainSharedParticipant extends DataObject<HelixHypeTrainSharedParticipantData> {
    /**
     * The ID of the user participating in the shared Hype Train.
     */
    get userId(): string;
    /**
     * The name of the user participating in the shared Hype Train.
     */
    get userName(): string;
    /**
     * The display name of the user participating in the shared Hype Train.
     */
    get userDisplayName(): string;
    /**
     * Gets additional information about the user participating in the shared Hype Train.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixHypeTrainSharedParticipant.d.ts.map