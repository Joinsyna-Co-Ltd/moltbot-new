import { Message } from "../../Message.mjs";
export class Error474BannedFromChan extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error474BannedFromChan.COMMAND = '474';
