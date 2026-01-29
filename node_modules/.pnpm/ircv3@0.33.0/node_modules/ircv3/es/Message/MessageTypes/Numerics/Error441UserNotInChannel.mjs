import { Message } from "../../Message.mjs";
export class Error441UserNotInChannel extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage.command === 'NICK';
    }
    endsResponseTo() {
        return true;
    }
}
Error441UserNotInChannel.COMMAND = '441';
