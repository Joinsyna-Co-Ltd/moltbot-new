import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply315EndOfWhoFields {
    me: string;
    query: string;
    suffix: string;
}
export interface Reply315EndOfWho extends Reply315EndOfWhoFields {
}
export declare class Reply315EndOfWho extends Message<Reply315EndOfWhoFields> {
    static readonly COMMAND = "315";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
