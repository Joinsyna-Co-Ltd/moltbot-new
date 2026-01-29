import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A custom Channel Points reward.
 */
let HelixCustomReward = class HelixCustomReward extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the reward.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster the reward belongs to.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster the reward belongs to.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster the reward belongs to.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the reward's broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * Gets the URL of the image of the reward in the given scale.
     *
     * @param scale The scale of the image.
     */
    getImageUrl(scale) {
        const urlProp = `url_${scale}x`;
        return this[rawDataSymbol].image?.[urlProp] ?? this[rawDataSymbol].default_image[urlProp];
    }
    /**
     * The background color of the reward.
     */
    get backgroundColor() {
        return this[rawDataSymbol].background_color;
    }
    /**
     * Whether the reward is enabled (shown to users).
     */
    get isEnabled() {
        return this[rawDataSymbol].is_enabled;
    }
    /**
     * The channel points cost of the reward.
     */
    get cost() {
        return this[rawDataSymbol].cost;
    }
    /**
     * The title of the reward.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The prompt shown to users when redeeming the reward.
     */
    get prompt() {
        return this[rawDataSymbol].prompt;
    }
    /**
     * Whether the reward requires user input to be redeemed.
     */
    get userInputRequired() {
        return this[rawDataSymbol].is_user_input_required;
    }
    /**
     * The maximum number of redemptions of the reward per stream. `null` means no limit.
     */
    get maxRedemptionsPerStream() {
        return this[rawDataSymbol].max_per_stream_setting.is_enabled
            ? this[rawDataSymbol].max_per_stream_setting.max_per_stream
            : null;
    }
    /**
     * The maximum number of redemptions of the reward per stream for each user. `null` means no limit.
     */
    get maxRedemptionsPerUserPerStream() {
        return this[rawDataSymbol].max_per_user_per_stream_setting.is_enabled
            ? this[rawDataSymbol].max_per_user_per_stream_setting.max_per_user_per_stream
            : null;
    }
    /**
     * The cooldown between two redemptions of the reward, in seconds. `null` means no cooldown.
     */
    get globalCooldown() {
        return this[rawDataSymbol].global_cooldown_setting.is_enabled
            ? this[rawDataSymbol].global_cooldown_setting.global_cooldown_seconds
            : null;
    }
    /**
     * Whether the reward is paused. If true, users can't redeem it.
     */
    get isPaused() {
        return this[rawDataSymbol].is_paused;
    }
    /**
     * Whether the reward is currently in stock.
     */
    get isInStock() {
        return this[rawDataSymbol].is_in_stock;
    }
    /**
     * How often the reward was already redeemed this stream.
     *
     * Only available when the stream is live and `maxRedemptionsPerStream` is set. Otherwise, this is `null`.
     */
    get redemptionsThisStream() {
        return this[rawDataSymbol].redemptions_redeemed_current_stream;
    }
    /**
     * Whether redemptions should automatically be marked as fulfilled.
     */
    get autoFulfill() {
        return this[rawDataSymbol].should_redemptions_skip_request_queue;
    }
    /**
     * The time when the cooldown ends. `null` means there is currently no cooldown.
     */
    get cooldownExpiryDate() {
        return this[rawDataSymbol].cooldown_expires_at ? new Date(this[rawDataSymbol].cooldown_expires_at) : null;
    }
};
__decorate([
    Enumerable(false)
], HelixCustomReward.prototype, "_client", void 0);
HelixCustomReward = __decorate([
    rtfm('api', 'HelixCustomReward', 'id')
], HelixCustomReward);
export { HelixCustomReward };
