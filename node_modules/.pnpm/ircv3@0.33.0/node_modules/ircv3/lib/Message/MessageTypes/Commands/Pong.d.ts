import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface PongFields {
    server: string;
    text: string;
}
export interface Pong extends PongFields {
}
export declare class Pong extends Message<PongFields> {
    static readonly COMMAND = "PONG";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
