import { DataObject } from '@twurple/common';
import { type HelixCharityCampaignDonationData } from '../../interfaces/endpoints/charity.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixCharityCampaignAmount } from './HelixCharityCampaignAmount.js';
/**
 * A donation to a charity campaign in a Twitch channel.
 */
export declare class HelixCharityCampaignDonation extends DataObject<HelixCharityCampaignDonationData> {
    /**
     * An ID that identifies the charity campaign.
     */
    get campaignId(): string;
    /**
     * The ID of the donating user.
     */
    get donorId(): string;
    /**
     * The name of the donating user.
     */
    get donorName(): string;
    /**
     * The display name of the donating user.
     */
    get donorDisplayName(): string;
    /**
     * Gets more information about the donating user.
     */
    getDonor(): Promise<HelixUser>;
    /**
     * An object that contains the amount of money that the user donated.
     */
    get amount(): HelixCharityCampaignAmount;
}
//# sourceMappingURL=HelixCharityCampaignDonation.d.ts.map