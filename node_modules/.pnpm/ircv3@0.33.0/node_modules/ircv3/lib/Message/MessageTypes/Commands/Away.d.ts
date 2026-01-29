import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface AwayFields {
    text?: string;
}
export interface Away extends AwayFields {
}
export declare class Away extends Message<AwayFields> {
    static readonly COMMAND = "AWAY";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
