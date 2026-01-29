import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply301AwayFields {
    me: string;
    nick: string;
    text: string;
}
export interface Reply301Away extends Reply301AwayFields {
}
export declare class Reply301Away extends Message<Reply301AwayFields> {
    static readonly COMMAND = "301";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
