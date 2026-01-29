import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixChatSettings } from './HelixChatSettings.js';
/**
 * The settings of a broadcaster's chat, with additional privileged data.
 */
let HelixPrivilegedChatSettings = class HelixPrivilegedChatSettings extends HelixChatSettings {
    /**
     * Whether non-moderator messages are delayed.
     */
    get nonModeratorChatDelayEnabled() {
        return this[rawDataSymbol].non_moderator_chat_delay;
    }
    /**
     * The delay of non-moderator messages, in seconds.
     *
     * Is `null` if non-moderator message delay is disabled.
     */
    get nonModeratorChatDelay() {
        return this[rawDataSymbol].non_moderator_chat_delay_duration;
    }
};
HelixPrivilegedChatSettings = __decorate([
    rtfm('api', 'HelixPrivilegedChatSettings', 'broadcasterId')
], HelixPrivilegedChatSettings);
export { HelixPrivilegedChatSettings };
