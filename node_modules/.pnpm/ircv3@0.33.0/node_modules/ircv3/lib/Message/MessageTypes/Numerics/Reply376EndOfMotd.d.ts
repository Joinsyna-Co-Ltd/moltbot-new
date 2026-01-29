import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply376EndOfMotdFields {
    me: string;
    suffix: string;
}
export interface Reply376EndOfMotd extends Reply376EndOfMotdFields {
}
export declare class Reply376EndOfMotd extends Message<Reply376EndOfMotdFields> {
    static readonly COMMAND = "376";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
