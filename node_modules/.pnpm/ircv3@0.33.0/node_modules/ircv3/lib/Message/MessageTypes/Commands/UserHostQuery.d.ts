import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface UserHostQueryFields {
    nicks: string;
}
export interface UserHostQuery extends UserHostQueryFields {
}
export declare class UserHostQuery extends Message<UserHostQueryFields> {
    static readonly COMMAND = "USERHOST";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
