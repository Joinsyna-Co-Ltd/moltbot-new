import { Message } from "../../Message.mjs";
import { Names } from "../Commands/Names.mjs";
export class Reply353NamesReply extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channelType: {},
            channel: { type: 'channel' },
            names: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof Names;
    }
}
Reply353NamesReply.COMMAND = '353';
