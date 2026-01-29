import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply352WhoReplyFields {
    me: string;
    channel: string;
    user: string;
    host: string;
    server: string;
    nick: string;
    flags: string;
    hopsAndRealName: string;
}
export interface Reply352WhoReply extends Reply352WhoReplyFields {
}
export declare class Reply352WhoReply extends Message<Reply352WhoReplyFields> {
    static readonly COMMAND = "352";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    /**
     * Checks whether the found user is /away.
     */
    get isAway(): boolean;
    /**
     * Checks whether the found user is an IRCOp.
     */
    get isOper(): boolean;
    /**
     * Checks whether the found user is a bot.
     */
    get isBot(): boolean;
    isResponseTo(originalMessage: Message): boolean;
}
export {};
