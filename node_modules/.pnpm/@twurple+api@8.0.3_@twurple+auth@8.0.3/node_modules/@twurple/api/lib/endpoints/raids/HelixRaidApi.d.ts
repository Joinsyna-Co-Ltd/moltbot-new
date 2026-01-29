import { type UserIdResolvable } from '@twurple/common';
import { BaseApi } from '../BaseApi.js';
import { HelixRaid } from './HelixRaid.js';
/**
 * The Helix API methods that deal with raids.
 *
 * Can be accessed using `client.raids` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const raid = await api.raids.startRaid('125328655', '61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Raids
 */
export declare class HelixRaidApi extends BaseApi {
    /**
     * Initiate a raid from a live broadcaster to another live broadcaster.
     *
     * @param from The raiding broadcaster.
     * @param to The raid target.
     */
    startRaid(from: UserIdResolvable, to: UserIdResolvable): Promise<HelixRaid>;
    /**
     * Cancels an initiated raid.
     *
     * @param from The raiding broadcaster.
     */
    cancelRaid(from: UserIdResolvable): Promise<void>;
}
//# sourceMappingURL=HelixRaidApi.d.ts.map