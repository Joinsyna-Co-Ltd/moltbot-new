import { DataObject } from '@twurple/common';
import type { HelixSentChatMessageData } from '../../interfaces/endpoints/chat.external.js';
/**
 * Information about a sent Twitch chat message.
 */
export declare class HelixSentChatMessage extends DataObject<HelixSentChatMessageData> {
    /**
     * The message ID of the sent message.
     */
    get id(): string;
    /**
     * If the message passed all checks and was sent.
     */
    get isSent(): boolean;
    /**
     * The reason code for why the chat message was dropped, if dropped.
     */
    get dropReasonCode(): string | undefined;
    /**
     * The reason message for why the chat message was dropped, if dropped.
     */
    get dropReasonMessage(): string | undefined;
}
//# sourceMappingURL=HelixSentChatMessage.d.ts.map