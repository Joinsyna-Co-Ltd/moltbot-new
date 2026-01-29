import { Message, type MessageInternalConfig, type MessageInternalContents } from 'ircv3';
import { ChatUser } from '../../../ChatUser.js';
interface WhisperFields {
    target: string;
    text: string;
}
/** @private */
export interface Whisper extends WhisperFields {
}
/** @private */
export declare class Whisper extends Message<WhisperFields> {
    static readonly COMMAND = "WHISPER";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    get userInfo(): ChatUser;
    get emoteOffsets(): Map<string, string[]>;
}
export {};
//# sourceMappingURL=Whisper.d.ts.map