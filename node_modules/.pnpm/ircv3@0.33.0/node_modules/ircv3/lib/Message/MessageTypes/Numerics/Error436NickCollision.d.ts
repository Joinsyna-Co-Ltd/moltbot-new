import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error436NickCollisionFields {
    me: string;
    nick: string;
    suffix: string;
}
export interface Error436NickCollision extends Error436NickCollisionFields {
}
export declare class Error436NickCollision extends Message<Error436NickCollisionFields> {
    static readonly COMMAND = "436";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(): boolean;
}
export {};
