import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface ServerQuitFields {
    server: string;
    reason: string;
}
export interface ServerQuit extends ServerQuitFields {
}
export declare class ServerQuit extends Message<ServerQuitFields> {
    static readonly COMMAND = "SQUIT";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
