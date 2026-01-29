import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface ChannelPartFields {
    channel: string;
    reason?: string;
}
export interface ChannelPart extends ChannelPartFields {
}
export declare class ChannelPart extends Message<ChannelPartFields> {
    static readonly COMMAND = "PART";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
