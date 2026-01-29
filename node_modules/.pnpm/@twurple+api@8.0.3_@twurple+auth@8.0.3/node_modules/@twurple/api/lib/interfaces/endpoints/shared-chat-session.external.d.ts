/** @private */
export interface HelixSharedChatSessionParticipantData {
    broadcaster_id: string;
}
/** @private */
export interface HelixSharedChatSessionData {
    session_id: string;
    host_broadcaster_id: string;
    participants: HelixSharedChatSessionParticipantData[];
    created_at: string;
    updated_at: string;
}
//# sourceMappingURL=shared-chat-session.external.d.ts.map