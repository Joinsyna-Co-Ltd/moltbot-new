import { Message } from "../../Message.mjs";
export class Error462AlreadyRegistered extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error462AlreadyRegistered.COMMAND = '462';
