import { Message } from "../../Message.mjs";
export class Error421UnknownCommand extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            originalCommand: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage.command === this.originalCommand;
    }
    endsResponseTo() {
        return true;
    }
}
Error421UnknownCommand.COMMAND = '421';
