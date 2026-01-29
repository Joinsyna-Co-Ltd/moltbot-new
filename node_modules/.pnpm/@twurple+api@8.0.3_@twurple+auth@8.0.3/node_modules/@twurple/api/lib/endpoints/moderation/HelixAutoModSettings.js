import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * The AutoMod settings of a channel.
 */
let HelixAutoModSettings = class HelixAutoModSettings extends DataObject {
    /**
     * The ID of the broadcaster for which the AutoMod settings were fetched.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The ID of a user that has permission to moderate the broadcaster's chat room.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_id;
    }
    /**
     * The default AutoMod level for the broadcaster. This is null if the broadcaster changed individual settings.
     */
    get overallLevel() {
        return this[rawDataSymbol].overall_level ? this[rawDataSymbol].overall_level : null;
    }
    /**
     * The AutoMod level for discrimination against disability.
     */
    get disability() {
        return this[rawDataSymbol].disability;
    }
    /**
     * The AutoMod level for hostility involving aggression.
     */
    get aggression() {
        return this[rawDataSymbol].aggression;
    }
    /**
     * The AutoMod level for discrimination based on sexuality, sex, or gender.
     */
    get sexualitySexOrGender() {
        return this[rawDataSymbol].sexuality_sex_or_gender;
    }
    /**
     * The AutoMod level for discrimination against women.
     */
    get misogyny() {
        return this[rawDataSymbol].misogyny;
    }
    /**
     * The AutoMod level for hostility involving name calling or insults.
     */
    get bullying() {
        return this[rawDataSymbol].bullying;
    }
    /**
     * The AutoMod level for profanity.
     */
    get swearing() {
        return this[rawDataSymbol].swearing;
    }
    /**
     * The AutoMod level for racial discrimination.
     */
    get raceEthnicityOrReligion() {
        return this[rawDataSymbol].race_ethnicity_or_religion;
    }
    /**
     * The AutoMod level for sexual content.
     */
    get sexBasedTerms() {
        return this[rawDataSymbol].sex_based_terms;
    }
};
HelixAutoModSettings = __decorate([
    rtfm('api', 'HelixAutoModSettings', 'broadcasterId')
], HelixAutoModSettings);
export { HelixAutoModSettings };
