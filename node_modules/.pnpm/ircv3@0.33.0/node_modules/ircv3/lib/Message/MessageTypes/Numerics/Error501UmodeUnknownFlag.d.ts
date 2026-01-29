import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface Error501UmodeUnknownFlagFields {
    me: string;
    modeChar?: string;
    suffix: string;
}
export interface Error501UmodeUnknownFlag extends Error501UmodeUnknownFlagFields {
}
export declare class Error501UmodeUnknownFlag extends Message<Error501UmodeUnknownFlagFields> {
    static readonly COMMAND = "501";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
