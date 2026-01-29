import { DataObject } from '@twurple/common';
import { type HelixHypeTrainData, type HelixHypeTrainType } from '../../interfaces/endpoints/hypeTrain.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixHypeTrainContribution } from './HelixHypeTrainContribution.js';
/**
 * Data about the currently running Hype Train.
 */
export declare class HelixHypeTrain extends DataObject<HelixHypeTrainData> {
    /**
     * The unique ID of the Hype Train event.
     */
    get eventId(): string;
    /**
     * The unique ID of the Hype Train.
     */
    get id(): string;
    /**
     * The user ID of the broadcaster where the Hype Train is happening.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster where the Hype Train is happening.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster where the Hype Train is happening.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster where the Hype Train is happening.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The level of the Hype Train.
     */
    get level(): number;
    /**
     * The total amount of progress points of the Hype Train.
     */
    get total(): number;
    /**
     * The amount progress points for the current level of the Hype Train.
     */
    get progress(): number;
    /**
     * The progress points goal to reach the next Hype Train level.
     */
    get goal(): number;
    /**
     * Array list of the top contributions to the Hype Train event for bits and subs.
     */
    get topContributions(): HelixHypeTrainContribution[];
    /**
     * The time when the Hype Train started.
     */
    get startDate(): Date;
    /**
     * The time when the Hype Train is set to expire.
     */
    get expiryDate(): Date;
    /**
     * The type of the Hype Train.
     */
    get type(): HelixHypeTrainType;
    /**
     * Whether the Hype Train is a shared train.
     */
    get isSharedTrain(): boolean;
}
//# sourceMappingURL=HelixHypeTrain.d.ts.map