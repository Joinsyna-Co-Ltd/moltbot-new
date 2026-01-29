import { Message } from "../../Message.mjs";
export class Reply301Away extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            text: { trailing: true }
        });
    }
}
Reply301Away.COMMAND = '301';
