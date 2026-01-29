import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixBanUser } from './HelixBanUser.js';
/**
 * Information about the ban of a user.
 *
 * @inheritDoc
 */
let HelixBan = class HelixBan extends HelixBanUser {
    /** @internal */
    constructor(data, client) {
        super(data, data.expires_at || null, client);
    }
    /**
     * The name of the user that was banned or put in a timeout.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that was banned or put in a timeout.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * The name of the moderator that banned or put the user in the timeout.
     */
    get moderatorName() {
        return this[rawDataSymbol].moderator_login;
    }
    /**
     * The display name of the moderator that banned or put the user in the timeout.
     */
    get moderatorDisplayName() {
        return this[rawDataSymbol].moderator_name;
    }
    /**
     * The reason why the user was banned or timed out. Returns `null` if no reason was given.
     */
    get reason() {
        return this[rawDataSymbol].reason || null;
    }
};
HelixBan = __decorate([
    rtfm('api', 'HelixBan', 'userId')
], HelixBan);
export { HelixBan };
