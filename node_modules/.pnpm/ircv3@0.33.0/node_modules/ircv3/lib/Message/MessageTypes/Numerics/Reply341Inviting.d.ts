import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply341InvitingFields {
    me: string;
    nick: string;
    channel: string;
}
export interface Reply341Inviting extends Reply341InvitingFields {
}
export declare class Reply341Inviting extends Message<Reply341InvitingFields> {
    static readonly COMMAND = "341";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
