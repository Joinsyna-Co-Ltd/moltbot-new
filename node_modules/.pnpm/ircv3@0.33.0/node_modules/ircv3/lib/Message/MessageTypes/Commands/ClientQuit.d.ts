import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface ClientQuitFields {
    text?: string;
}
export interface ClientQuit extends ClientQuitFields {
}
export declare class ClientQuit extends Message<ClientQuitFields> {
    static readonly COMMAND = "QUIT";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
