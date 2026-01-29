import { DataObject } from '@twurple/common';
import { type HelixRaidData } from '../../interfaces/endpoints/raid.external.js';
/**
 * A result of a successful raid initiation.
 */
export declare class HelixRaid extends DataObject<HelixRaidData> {
    /**
     * The date when the raid was initiated.
     */
    get creationDate(): Date;
    /**
     * Whether the raid target channel is intended for mature audiences.
     */
    get targetIsMature(): boolean;
}
//# sourceMappingURL=HelixRaid.d.ts.map