import { DataObject } from '@twurple/common';
import { type HelixTeamData } from '../../interfaces/endpoints/team.external.js';
import type { HelixUserRelation } from '../../relations/HelixUserRelation.js';
/**
 * A Stream Team.
 */
export declare class HelixTeam extends DataObject<HelixTeamData> {
    /**
     * The ID of the team.
     */
    get id(): string;
    /**
     * The name of the team.
     */
    get name(): string;
    /**
     * The display name of the team.
     */
    get displayName(): string;
    /**
     * The URL of the background image of the team.
     */
    get backgroundImageUrl(): string | null;
    /**
     * The URL of the banner of the team.
     */
    get bannerUrl(): string | null;
    /**
     * The date when the team was created.
     */
    get creationDate(): Date;
    /**
     * The date when the team was last updated.
     */
    get updateDate(): Date;
    /**
     * The info of the team.
     *
     * May contain HTML tags.
     */
    get info(): string;
    /**
     * The URL of the thumbnail of the team's logo.
     */
    get logoThumbnailUrl(): string;
    /**
     * Gets the relations to the members of the team.
     */
    getUserRelations(): Promise<HelixUserRelation[]>;
}
//# sourceMappingURL=HelixTeam.d.ts.map