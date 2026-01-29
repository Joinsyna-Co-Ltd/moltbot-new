import { Message } from "../../Message.mjs";
export class Error443UserOnChannel extends Message {
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
Error443UserOnChannel.COMMAND = '443';
