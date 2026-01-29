import { Message } from "../../Message.mjs";
export class Reply391Time extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            server: { optional: true },
            timestamp: { trailing: true }
        });
    }
}
Reply391Time.COMMAND = '391';
