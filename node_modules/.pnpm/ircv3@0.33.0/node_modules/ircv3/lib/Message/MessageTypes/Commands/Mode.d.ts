import { Message, type MessageInternalConfig, type MessageInternalContents, type MessagePrefix } from '../../Message';
export type ModeAction = 'getList' | 'add' | 'remove';
export interface SingleMode {
    prefix?: MessagePrefix;
    action: ModeAction;
    letter: string;
    param?: string;
    known: boolean;
}
interface ModeFields {
    target: string;
    modes?: string;
}
export interface Mode extends ModeFields {
}
export declare class Mode extends Message<ModeFields> {
    static readonly COMMAND = "MODE";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    get isChannel(): boolean;
    separate(): SingleMode[];
}
export {};
