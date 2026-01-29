import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error441UserNotInChannelFields {
    me: string;
    nick: string;
    channel: string;
    suffix: string;
}
export interface Error441UserNotInChannel extends Error441UserNotInChannelFields {
}
export declare class Error441UserNotInChannel extends Message<Error441UserNotInChannelFields> {
    static readonly COMMAND = "441";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
