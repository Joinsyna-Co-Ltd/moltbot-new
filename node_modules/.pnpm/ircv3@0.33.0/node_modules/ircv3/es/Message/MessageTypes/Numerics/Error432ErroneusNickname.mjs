import { Message } from "../../Message.mjs";
export class Error432ErroneusNickname extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
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
Error432ErroneusNickname.COMMAND = '432';
