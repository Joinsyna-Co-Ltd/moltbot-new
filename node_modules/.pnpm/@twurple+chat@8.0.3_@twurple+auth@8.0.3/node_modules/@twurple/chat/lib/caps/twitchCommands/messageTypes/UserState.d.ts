import { Message, type MessageInternalConfig, type MessageInternalContents } from 'ircv3';
interface UserStateFields {
    channel: string;
}
/** @private */
export interface UserState extends UserStateFields {
}
/** @private */
export declare class UserState extends Message<UserStateFields> {
    static readonly COMMAND = "USERSTATE";
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
}
export {};
//# sourceMappingURL=UserState.d.ts.map