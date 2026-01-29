import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error443UserOnChannelFields {
    me: string;
    nick: string;
    channel: string;
    suffix: string;
}
export interface Error443UserOnChannel extends Error443UserOnChannelFields {
}
export declare class Error443UserOnChannel extends Message<Error443UserOnChannelFields> {
    static readonly COMMAND = "443";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
