import { HelixChatSettings } from './HelixChatSettings.js';
/**
 * The settings of a broadcaster's chat, with additional privileged data.
 */
export declare class HelixPrivilegedChatSettings extends HelixChatSettings {
    /**
     * Whether non-moderator messages are delayed.
     */
    get nonModeratorChatDelayEnabled(): boolean;
    /**
     * The delay of non-moderator messages, in seconds.
     *
     * Is `null` if non-moderator message delay is disabled.
     */
    get nonModeratorChatDelay(): number | null;
}
//# sourceMappingURL=HelixPrivilegedChatSettings.d.ts.map