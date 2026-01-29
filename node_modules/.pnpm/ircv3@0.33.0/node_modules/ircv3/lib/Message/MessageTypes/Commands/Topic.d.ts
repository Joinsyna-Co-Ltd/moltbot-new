import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface TopicFields {
    channel: string;
    newTopic?: string;
}
export interface Topic extends TopicFields {
}
export declare class Topic extends Message<TopicFields> {
    static readonly COMMAND = "TOPIC";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
