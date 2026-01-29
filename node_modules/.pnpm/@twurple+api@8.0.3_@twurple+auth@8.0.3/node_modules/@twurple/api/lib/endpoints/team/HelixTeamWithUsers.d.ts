import { HelixUserRelation } from '../../relations/HelixUserRelation.js';
import { HelixTeam } from './HelixTeam.js';
/**
 * A Stream Team with its member relations.
 *
 * @inheritDoc
 */
export declare class HelixTeamWithUsers extends HelixTeam {
    /**
     * The relations to the members of the team.
     */
    get userRelations(): HelixUserRelation[];
}
//# sourceMappingURL=HelixTeamWithUsers.d.ts.map