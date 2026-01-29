import { DataObject } from '@twurple/common';
import { type HelixSharedChatSessionData } from '../../interfaces/endpoints/shared-chat-session.external.js';
import { type HelixUser } from '../user/HelixUser.js';
import { HelixSharedChatSessionParticipant } from './HelixSharedChatSessionParticipant.js';
/**
 * A shared chat session.
 */
export declare class HelixSharedChatSession extends DataObject<HelixSharedChatSessionData> {
    /**
     * The unique identifier for the shared chat session.
     */
    get sessionId(): string;
    /**
     * The ID of the host broadcaster.
     */
    get hostBroadcasterId(): string;
    /**
     * Gets information about the host broadcaster.
     */
    getHostBroadcaster(): Promise<HelixUser>;
    /**
     * The list of participants in the session.
     */
    get participants(): HelixSharedChatSessionParticipant[];
    /**
     * The date for when the session was created.
     */
    get createdDate(): Date;
    /**
     * The date for when the session was updated.
     */
    get updatedDate(): Date;
}
//# sourceMappingURL=HelixSharedChatSession.d.ts.map