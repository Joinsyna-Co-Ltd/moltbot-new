import { Message, type MessageInternalConfig, type MessageInternalContents } from 'ircv3';
interface ClearChatFields {
    channel: string;
    user?: string;
}
export interface ClearChat extends ClearChatFields {
}
export declare class ClearChat extends Message<ClearChatFields> {
    static readonly COMMAND = "CLEARCHAT";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    get date(): Date;
    get channelId(): string;
    get targetUserId(): string | null;
}
export {};
//# sourceMappingURL=ClearChat.d.ts.map