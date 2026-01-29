import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface ChannelListFields {
    channel?: string;
    server?: string;
}
export interface ChannelList extends ChannelListFields {
}
export declare class ChannelList extends Message<ChannelListFields> {
    static readonly COMMAND = "LIST";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
