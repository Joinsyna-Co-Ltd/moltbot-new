import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error432ErroneusNicknameFields {
    me: string;
    nick: string;
    suffix: string;
}
export interface Error432ErroneusNickname extends Error432ErroneusNicknameFields {
}
export declare class Error432ErroneusNickname extends Message<Error432ErroneusNicknameFields> {
    static readonly COMMAND = "432";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
