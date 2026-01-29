import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply366EndOfNamesFields {
    me: string;
    channel: string;
    suffix: string;
}
export interface Reply366EndOfNames extends Reply366EndOfNamesFields {
}
export declare class Reply366EndOfNames extends Message<Reply366EndOfNamesFields> {
    static readonly COMMAND = "366";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
