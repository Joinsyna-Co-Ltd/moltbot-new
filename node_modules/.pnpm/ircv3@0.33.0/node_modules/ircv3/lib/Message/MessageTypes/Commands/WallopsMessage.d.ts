import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface WallopsMessageFields {
    text: string;
}
export interface WallopsMessage extends WallopsMessageFields {
}
export declare class WallopsMessage extends Message<WallopsMessageFields> {
    static readonly COMMAND = "WALLOPS";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
