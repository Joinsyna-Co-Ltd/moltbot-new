import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error421UnknownCommandFields {
    me: string;
    originalCommand: string;
    suffix: string;
}
export interface Error421UnknownCommand extends Error421UnknownCommandFields {
}
export declare class Error421UnknownCommand extends Message<Error421UnknownCommandFields> {
    static readonly COMMAND = "421";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
