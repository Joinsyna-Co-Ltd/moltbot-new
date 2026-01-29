import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../../../../Message/Message';
interface BatchFields {
    reference: string;
    type?: string;
    additionalParams?: string;
}
export interface Batch extends BatchFields {
}
export declare class Batch extends Message<BatchFields> {
    static readonly COMMAND = "BATCH";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
