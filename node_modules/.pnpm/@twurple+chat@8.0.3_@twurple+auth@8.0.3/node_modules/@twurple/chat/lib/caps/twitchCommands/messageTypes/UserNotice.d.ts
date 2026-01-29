import { Message, type MessageInternalConfig, type MessageInternalContents } from 'ircv3';
import { ChatUser } from '../../../ChatUser.js';
interface UserNoticeFields {
    channel: string;
    text?: string;
}
export interface UserNotice extends UserNoticeFields {
}
export declare class UserNotice extends Message<UserNoticeFields> {
    static readonly COMMAND = "USERNOTICE";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    get id(): string;
    get date(): Date;
    get userInfo(): ChatUser;
    get channelId(): string | null;
    get emoteOffsets(): Map<string, string[]>;
}
export {};
//# sourceMappingURL=UserNotice.d.ts.map