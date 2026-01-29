import { Message } from "../../Message.mjs";
export class TagMessage extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {}
        });
    }
}
TagMessage.COMMAND = 'TAGMSG';
