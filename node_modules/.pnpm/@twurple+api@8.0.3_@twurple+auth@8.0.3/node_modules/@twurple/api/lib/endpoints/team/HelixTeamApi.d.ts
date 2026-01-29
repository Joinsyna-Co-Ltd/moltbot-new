import { type UserIdResolvable } from '@twurple/common';
import { BaseApi } from '../BaseApi.js';
import { HelixTeam } from './HelixTeam.js';
import { HelixTeamWithUsers } from './HelixTeamWithUsers.js';
/**
 * The Helix API methods that deal with teams.
 *
 * Can be accessed using `client.teams` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const tags = await api.teams.getChannelTeams('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Teams
 */
export declare class HelixTeamApi extends BaseApi {
    /**
     * Gets a list of all teams a broadcaster is a member of.
     *
     * @param broadcaster The broadcaster to get the teams of.
     */
    getTeamsForBroadcaster(broadcaster: UserIdResolvable): Promise<HelixTeam[]>;
    /**
     * Gets a team by ID.
     *
     * Returns null if there is no team with the given ID.
     *
     * @param id The ID of the team.
     */
    getTeamById(id: string): Promise<HelixTeamWithUsers | null>;
    /**
     * Gets a team by name.
     *
     * Returns null if there is no team with the given name.
     *
     * @param name The name of the team.
     */
    getTeamByName(name: string): Promise<HelixTeamWithUsers | null>;
}
//# sourceMappingURL=HelixTeamApi.d.ts.map