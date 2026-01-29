import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply005IsupportFields {
    me: string;
    supports: string;
    suffix: string;
}
export interface Reply005Isupport extends Reply005IsupportFields {
}
export declare class Reply005Isupport extends Message<Reply005IsupportFields> {
    static readonly COMMAND = "005";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
