import { Message } from "../../Message.mjs";
export class Reply323ListEnd extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Reply323ListEnd.COMMAND = '323';
