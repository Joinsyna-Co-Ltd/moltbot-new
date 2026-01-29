import { DataObject } from '@twurple/common';
import { type HelixAutoModSettingsData } from '../../interfaces/endpoints/moderation.external.js';
/**
 * The AutoMod settings of a channel.
 */
export declare class HelixAutoModSettings extends DataObject<HelixAutoModSettingsData> {
    /**
     * The ID of the broadcaster for which the AutoMod settings were fetched.
     */
    get broadcasterId(): string;
    /**
     * The ID of a user that has permission to moderate the broadcaster's chat room.
     */
    get moderatorId(): string;
    /**
     * The default AutoMod level for the broadcaster. This is null if the broadcaster changed individual settings.
     */
    get overallLevel(): number | null;
    /**
     * The AutoMod level for discrimination against disability.
     */
    get disability(): number;
    /**
     * The AutoMod level for hostility involving aggression.
     */
    get aggression(): number;
    /**
     * The AutoMod level for discrimination based on sexuality, sex, or gender.
     */
    get sexualitySexOrGender(): number;
    /**
     * The AutoMod level for discrimination against women.
     */
    get misogyny(): number;
    /**
     * The AutoMod level for hostility involving name calling or insults.
     */
    get bullying(): number;
    /**
     * The AutoMod level for profanity.
     */
    get swearing(): number;
    /**
     * The AutoMod level for racial discrimination.
     */
    get raceEthnicityOrReligion(): number;
    /**
     * The AutoMod level for sexual content.
     */
    get sexBasedTerms(): number;
}
//# sourceMappingURL=HelixAutoModSettings.d.ts.map