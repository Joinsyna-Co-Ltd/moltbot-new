import { Message } from "../../Message.mjs";
export class Reply319WhoisChannels extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channels: { trailing: true }
        });
    }
}
Reply319WhoisChannels.COMMAND = '319';
