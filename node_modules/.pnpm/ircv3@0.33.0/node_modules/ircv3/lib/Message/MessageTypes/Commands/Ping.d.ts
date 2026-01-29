import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface PingFields {
    text: string;
}
export interface Ping extends PingFields {
}
export declare class Ping extends Message<PingFields> {
    static readonly COMMAND = "PING";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
