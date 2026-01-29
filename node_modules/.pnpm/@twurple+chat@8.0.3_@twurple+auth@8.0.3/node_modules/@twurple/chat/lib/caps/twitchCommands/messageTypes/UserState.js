import { Message } from 'ircv3';
/** @private */
export class UserState extends Message {
    static COMMAND = 'USERSTATE';
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
        });
    }
}
