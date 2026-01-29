import { DataObject } from '@twurple/common';
import { type HelixChatChatterData } from '../../interfaces/endpoints/chat.external.js';
import { type HelixUser } from '../user/HelixUser.js';
/**
 * A user connected to a Twitch channel's chat session.
 */
export declare class HelixChatChatter extends DataObject<HelixChatChatterData> {
    /**
     * The ID of the user.
     */
    get userId(): string;
    /**
     * The name of the user.
     */
    get userName(): string;
    /**
     * The display name of the user.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the user.
     */
    getUser(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixChatChatter.d.ts.map