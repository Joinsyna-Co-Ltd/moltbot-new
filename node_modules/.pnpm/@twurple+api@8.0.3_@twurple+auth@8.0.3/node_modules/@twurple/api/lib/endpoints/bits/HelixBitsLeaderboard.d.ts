import { DataObject } from '@twurple/common';
import { type HelixBitsLeaderboardResponse } from '../../interfaces/endpoints/bits.external.js';
import { HelixBitsLeaderboardEntry } from './HelixBitsLeaderboardEntry.js';
/**
 * A leaderboard where the users who used the most bits to a broadcaster are listed.
 */
export declare class HelixBitsLeaderboard extends DataObject<HelixBitsLeaderboardResponse> {
    /**
     * The entries of the leaderboard.
     */
    get entries(): HelixBitsLeaderboardEntry[];
    /**
     * The total amount of people on the requested leaderboard.
     */
    get totalCount(): number;
}
//# sourceMappingURL=HelixBitsLeaderboard.d.ts.map