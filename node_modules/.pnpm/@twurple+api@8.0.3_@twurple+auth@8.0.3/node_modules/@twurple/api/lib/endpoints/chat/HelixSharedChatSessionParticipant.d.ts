import { DataObject } from '@twurple/common';
import { type HelixSharedChatSessionParticipantData } from '../../interfaces/endpoints/shared-chat-session.external.js';
import { type HelixUser } from '../user/HelixUser.js';
/**
 * A shared chat session participant.
 */
export declare class HelixSharedChatSessionParticipant extends DataObject<HelixSharedChatSessionParticipantData> {
    /**
     * The ID of the participant broadcaster.
     */
    get broadcasterId(): string;
    /**
     * Gets information about the participant broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
}
//# sourceMappingURL=HelixSharedChatSessionParticipant.d.ts.map