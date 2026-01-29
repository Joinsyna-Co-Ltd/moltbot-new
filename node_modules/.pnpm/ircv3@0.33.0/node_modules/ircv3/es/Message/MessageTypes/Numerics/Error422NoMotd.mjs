import { Message } from "../../Message.mjs";
export class Error422NoMotd extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error422NoMotd.COMMAND = '422';
