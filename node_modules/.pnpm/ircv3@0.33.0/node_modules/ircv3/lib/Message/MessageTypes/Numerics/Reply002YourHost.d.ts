import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply002YourHostFields {
    me: string;
    yourHost: string;
}
export interface Reply002YourHost extends Reply002YourHostFields {
}
export declare class Reply002YourHost extends Message<Reply002YourHostFields> {
    static readonly COMMAND = "002";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
