import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply353NamesReplyFields {
    me: string;
    channelType: string;
    channel: string;
    names: string;
}
export interface Reply353NamesReply extends Reply353NamesReplyFields {
}
export declare class Reply353NamesReply extends Message<Reply353NamesReplyFields> {
    static readonly COMMAND = "353";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
}
export {};
