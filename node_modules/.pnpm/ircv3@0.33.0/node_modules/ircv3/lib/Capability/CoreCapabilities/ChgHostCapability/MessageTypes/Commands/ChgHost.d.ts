import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../../../../Message/Message';
interface ChgHostFields {
    newUser: string;
    newHost: string;
}
export interface ChgHost extends ChgHostFields {
}
export declare class ChgHost extends Message<ChgHostFields> {
    static readonly COMMAND = "CHGHOST";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
