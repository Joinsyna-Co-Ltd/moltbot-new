import { Message } from "../../Message.mjs";
export class Reply318EndOfWhois extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nickMask: {},
            suffix: { trailing: true }
        });
    }
}
Reply318EndOfWhois.COMMAND = '318';
