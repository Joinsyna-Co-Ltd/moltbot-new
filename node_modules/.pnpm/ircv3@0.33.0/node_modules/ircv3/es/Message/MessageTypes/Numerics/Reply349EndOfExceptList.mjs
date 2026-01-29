import { Message } from "../../Message.mjs";
export class Reply349EndOfExceptList extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Reply349EndOfExceptList.COMMAND = '349';
