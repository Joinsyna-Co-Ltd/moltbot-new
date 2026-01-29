import { Message } from "../../Message.mjs";
export class Error451NotRegistered extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error451NotRegistered.COMMAND = '451';
