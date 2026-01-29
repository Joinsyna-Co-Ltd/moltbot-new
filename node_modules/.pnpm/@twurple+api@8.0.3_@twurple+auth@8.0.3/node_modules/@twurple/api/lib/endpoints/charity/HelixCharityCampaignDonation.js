import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixCharityCampaignAmount } from './HelixCharityCampaignAmount.js';
/**
 * A donation to a charity campaign in a Twitch channel.
 */
let HelixCharityCampaignDonation = class HelixCharityCampaignDonation extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * An ID that identifies the charity campaign.
     */
    get campaignId() {
        return this[rawDataSymbol].campaign_id;
    }
    /**
     * The ID of the donating user.
     */
    get donorId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the donating user.
     */
    get donorName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the donating user.
     */
    get donorDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the donating user.
     */
    async getDonor() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * An object that contains the amount of money that the user donated.
     */
    get amount() {
        return new HelixCharityCampaignAmount(this[rawDataSymbol].amount);
    }
};
__decorate([
    Enumerable(false)
], HelixCharityCampaignDonation.prototype, "_client", void 0);
HelixCharityCampaignDonation = __decorate([
    rtfm('api', 'HelixCharityCampaignDonation')
], HelixCharityCampaignDonation);
export { HelixCharityCampaignDonation };
