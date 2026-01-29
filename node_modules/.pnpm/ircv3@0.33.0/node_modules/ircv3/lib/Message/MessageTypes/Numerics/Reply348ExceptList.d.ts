import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply348ExceptListFields {
    me: string;
    channel: string;
    mask: string;
    creatorName?: string;
    timestamp?: string;
}
export interface Reply348ExceptList extends Reply348ExceptListFields {
}
export declare class Reply348ExceptList extends Message<Reply348ExceptListFields> {
    static readonly COMMAND = "348";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
