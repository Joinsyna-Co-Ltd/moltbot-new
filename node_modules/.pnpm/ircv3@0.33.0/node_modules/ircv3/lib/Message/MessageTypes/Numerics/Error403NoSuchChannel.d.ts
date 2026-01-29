import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error403NoSuchChannelFields {
    me: string;
    channel: string;
    suffix: string;
}
export interface Error403NoSuchChannel extends Error403NoSuchChannelFields {
}
export declare class Error403NoSuchChannel extends Message<Error403NoSuchChannelFields> {
    static readonly COMMAND = "403";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
