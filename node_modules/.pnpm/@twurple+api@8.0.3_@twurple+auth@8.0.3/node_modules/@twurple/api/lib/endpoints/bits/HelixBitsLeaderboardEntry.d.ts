import { DataObject } from '@twurple/common';
import { type HelixBitsLeaderboardEntryData } from '../../interfaces/endpoints/bits.external.js';
import { type HelixUser } from '../user/HelixUser.js';
/**
 * A Bits leaderboard entry.
 */
export declare class HelixBitsLeaderboardEntry extends DataObject<HelixBitsLeaderboardEntryData> {
    /**
     * The ID of the user on the leaderboard.
     */
    get userId(): string;
    /**
     * The name of the user on the leaderboard.
     */
    get userName(): string;
    /**
     * The display name of the user on the leaderboard.
     */
    get userDisplayName(): string;
    /**
     * The position of the user on the leaderboard.
     */
    get rank(): number;
    /**
     * The amount of bits used in the given period of time.
     */
    get amount(): number;
    /**
     * Gets the user of entry on the leaderboard.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixBitsLeaderboardEntry.d.ts.map