import { DataObject } from '@twurple/common';
import { type HelixHypeTrainContributionData, type HelixHypeTrainContributionType } from '../../interfaces/endpoints/hypeTrain.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A Hype Train contributor.
 */
export declare class HelixHypeTrainContribution extends DataObject<HelixHypeTrainContributionData> {
    /**
     * The ID of the user contributing to the Hype Train.
     */
    get userId(): string;
    /**
     * The name of the user contributing to the Hype Train.
     */
    get userName(): string;
    /**
     * The display name of the user contributing to the Hype Train.
     */
    get userDisplayName(): string;
    /**
     * Gets additional information about the user contributing to the Hype Train.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The type of the Hype Train contribution.
     */
    get type(): HelixHypeTrainContributionType;
    /**
     * The total contribution amount in subs or bits.
     */
    get total(): number;
}
//# sourceMappingURL=HelixHypeTrainContribution.d.ts.map