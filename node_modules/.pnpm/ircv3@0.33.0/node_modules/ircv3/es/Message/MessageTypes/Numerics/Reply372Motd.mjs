import { Message } from "../../Message.mjs";
export class Reply372Motd extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            line: { trailing: true }
        });
    }
}
Reply372Motd.COMMAND = '372';
