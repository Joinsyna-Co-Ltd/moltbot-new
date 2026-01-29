import { Message } from "../../Message.mjs";
export class Reply376EndOfMotd extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Reply376EndOfMotd.COMMAND = '376';
