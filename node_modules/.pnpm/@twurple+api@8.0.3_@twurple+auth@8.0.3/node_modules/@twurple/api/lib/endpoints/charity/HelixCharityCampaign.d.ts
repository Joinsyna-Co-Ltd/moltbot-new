import { DataObject } from '@twurple/common';
import { type HelixCharityCampaignData } from '../../interfaces/endpoints/charity.external.js';
import type { HelixUser } from '../user/HelixUser.js';
import { HelixCharityCampaignAmount } from './HelixCharityCampaignAmount.js';
/**
 * A charity campaign in a Twitch channel.
 */
export declare class HelixCharityCampaign extends DataObject<HelixCharityCampaignData> {
    /**
     * An ID that identifies the charity campaign.
     */
    get id(): string;
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The name of the charity.
     */
    get charityName(): string;
    /**
     * A description of the charity.
     */
    get charityDescription(): string;
    /**
     * A URL to an image of the charity's logo. The image’s type is PNG and its size is 100px X 100px.
     */
    get charityLogo(): string;
    /**
     * A URL to the charity’s website.
     */
    get charityWebsite(): string;
    /**
     * An object that contains the current amount of donations that the campaign has received.
     */
    get currentAmount(): HelixCharityCampaignAmount;
    /**
     * An object that contains the campaign’s target fundraising goal.
     */
    get targetAmount(): HelixCharityCampaignAmount;
}
//# sourceMappingURL=HelixCharityCampaign.d.ts.map