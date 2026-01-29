import { Message } from "../../Message.mjs";
export class Reply375MotdStart extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            line: { trailing: true }
        });
    }
}
Reply375MotdStart.COMMAND = '375';
