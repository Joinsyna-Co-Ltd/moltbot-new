import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface ChannelJoinFields {
    channel: string;
    key?: string;
}
export interface ChannelJoin extends ChannelJoinFields {
}
export declare class ChannelJoin extends Message<ChannelJoinFields> {
    static readonly COMMAND = "JOIN";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
