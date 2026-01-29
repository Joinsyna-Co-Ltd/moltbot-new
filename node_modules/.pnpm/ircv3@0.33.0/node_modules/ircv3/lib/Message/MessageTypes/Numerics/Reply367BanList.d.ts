import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Reply367BanListFields {
    me: string;
    channel: string;
    mask: string;
    creatorName?: string;
    timestamp?: string;
}
export interface Reply367BanList extends Reply367BanListFields {
}
export declare class Reply367BanList extends Message<Reply367BanListFields> {
    static readonly COMMAND = "367";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
