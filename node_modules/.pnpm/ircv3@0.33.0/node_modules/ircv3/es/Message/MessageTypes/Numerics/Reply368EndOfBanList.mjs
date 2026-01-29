import { Message } from "../../Message.mjs";
export class Reply368EndOfBanList extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Reply368EndOfBanList.COMMAND = '368';
