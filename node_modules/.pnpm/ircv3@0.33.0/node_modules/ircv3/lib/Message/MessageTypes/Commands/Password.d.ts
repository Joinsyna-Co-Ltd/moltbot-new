import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface PasswordFields {
    password: string;
}
export interface Password extends PasswordFields {
}
export declare class Password extends Message<PasswordFields> {
    static readonly COMMAND = "PASS";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
