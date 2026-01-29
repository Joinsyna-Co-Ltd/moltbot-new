import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface UserRegistrationFields {
    user: string;
    mode: string;
    unused: string;
    realName: string;
}
export interface UserRegistration extends UserRegistrationFields {
}
export declare class UserRegistration extends Message<UserRegistrationFields> {
    static readonly COMMAND = "USER";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
