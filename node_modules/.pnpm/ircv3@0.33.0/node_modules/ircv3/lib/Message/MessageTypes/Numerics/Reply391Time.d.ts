import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply391TimeFields {
    me: string;
    server?: string;
    timestamp: string;
}
export interface Reply391Time extends Reply391TimeFields {
}
export declare class Reply391Time extends Message<Reply391TimeFields> {
    static readonly COMMAND = "391";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
