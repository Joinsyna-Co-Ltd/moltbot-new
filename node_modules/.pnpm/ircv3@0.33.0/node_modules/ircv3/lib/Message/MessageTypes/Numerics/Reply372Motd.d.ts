import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply372MotdFields {
    me: string;
    line: string;
}
export interface Reply372Motd extends Reply372MotdFields {
}
export declare class Reply372Motd extends Message<Reply372MotdFields> {
    static readonly COMMAND = "372";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
