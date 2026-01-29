import { Message } from "../../Message.mjs";
export class Error401NoSuchNick extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            suffix: { trailing: true }
        });
    }
}
Error401NoSuchNick.COMMAND = '401';
