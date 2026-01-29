import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface WhoIsQueryFields {
    server?: string;
    nickMask: string;
}
export interface WhoIsQuery extends WhoIsQueryFields {
}
export declare class WhoIsQuery extends Message<WhoIsQueryFields> {
    static readonly COMMAND = "WHOIS";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
