import { Message } from "../../Message.mjs";
export class PrivateMessage extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            text: { trailing: true }
        });
    }
}
PrivateMessage.COMMAND = 'PRIVMSG';
