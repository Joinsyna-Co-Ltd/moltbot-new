import { Message, type MessageInternalConfig, type MessageInternalContents } from 'ircv3';
interface ClearMsgFields {
    channel: string;
    text: string;
}
export interface ClearMsg extends ClearMsgFields {
}
export declare class ClearMsg extends Message<ClearMsgFields> {
    static readonly COMMAND = "CLEARMSG";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    get date(): Date;
    get userName(): string;
    get channelId(): string;
    get targetMessageId(): string;
}
export {};
//# sourceMappingURL=ClearMsg.d.ts.map