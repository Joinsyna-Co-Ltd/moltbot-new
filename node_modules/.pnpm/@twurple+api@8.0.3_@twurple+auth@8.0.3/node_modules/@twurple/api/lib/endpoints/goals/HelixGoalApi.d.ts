import { type UserIdResolvable } from '@twurple/common';
import { BaseApi } from '../BaseApi.js';
import { HelixGoal } from './HelixGoal.js';
/**
 * The Helix API methods that deal with creator goals.
 *
 * Can be accessed using `client.goals` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: goals } = await api.helix.goals.getGoals('61369223');
 *
 * @meta category helix
 * @meta categorizedTitle Goals
 */
export declare class HelixGoalApi extends BaseApi {
    getGoals(broadcaster: UserIdResolvable): Promise<HelixGoal[]>;
}
//# sourceMappingURL=HelixGoalApi.d.ts.map