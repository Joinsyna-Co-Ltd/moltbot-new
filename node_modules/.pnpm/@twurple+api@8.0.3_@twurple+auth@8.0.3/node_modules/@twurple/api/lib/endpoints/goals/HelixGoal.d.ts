import { DataObject } from '@twurple/common';
import { type HelixGoalData, type HelixGoalType } from '../../interfaces/endpoints/goal.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A creator goal.
 */
export declare class HelixGoal extends DataObject<HelixGoalData> {
    /**
     * The ID of the goal.
     */
    get id(): string;
    /**
     * The ID of the broadcaster the goal belongs to.
     */
    get broadcasterId(): string;
    /**
     * The display name of the broadcaster the goal belongs to.
     */
    get broadcasterDisplayName(): string;
    /**
     * The name of the broadcaster the goal belongs to.
     */
    get broadcasterName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The type of the goal.
     */
    get type(): HelixGoalType;
    /**
     * The description of the goal.
     */
    get description(): string;
    /**
     * The current value of the goal.
     */
    get currentAmount(): number;
    /**
     * The target value of the goal.
     */
    get targetAmount(): number;
    /**
     * The date and time when the goal was created.
     */
    get creationDate(): Date;
}
//# sourceMappingURL=HelixGoal.d.ts.map