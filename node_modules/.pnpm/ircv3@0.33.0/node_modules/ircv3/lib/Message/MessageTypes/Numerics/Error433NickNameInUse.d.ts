import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error433NickNameInUseFields {
    me: string;
    nick: string;
    suffix: string;
}
export interface Error433NickNameInUse extends Error433NickNameInUseFields {
}
export declare class Error433NickNameInUse extends Message<Error433NickNameInUseFields> {
    static readonly COMMAND = "433";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
