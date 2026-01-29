import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply001WelcomeFields {
    me: string;
    welcomeText: string;
}
export interface Reply001Welcome extends Reply001WelcomeFields {
}
export declare class Reply001Welcome extends Message<Reply001WelcomeFields> {
    static readonly COMMAND = "001";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
