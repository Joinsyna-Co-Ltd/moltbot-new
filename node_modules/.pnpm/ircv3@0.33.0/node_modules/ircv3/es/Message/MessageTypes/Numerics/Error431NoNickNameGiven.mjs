import { Message } from "../../Message.mjs";
export class Error431NoNickNameGiven extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
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
Error431NoNickNameGiven.COMMAND = '431';
