import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply375MotdStartFields {
    me: string;
    line: string;
}
export interface Reply375MotdStart extends Reply375MotdStartFields {
}
export declare class Reply375MotdStart extends Message<Reply375MotdStartFields> {
    static readonly COMMAND = "375";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
