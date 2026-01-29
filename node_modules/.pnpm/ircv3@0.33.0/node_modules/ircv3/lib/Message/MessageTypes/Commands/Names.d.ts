import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface NamesFields {
    channel?: string;
}
export interface Names extends NamesFields {
}
export declare class Names extends Message<NamesFields> {
    static readonly COMMAND = "NAMES";
    static readonly SUPPORTS_CAPTURE = true;
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
