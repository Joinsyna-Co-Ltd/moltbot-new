import { Message } from "../../Message.mjs";
export class ChannelKick extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            target: {},
            reason: { trailing: true, optional: true }
        });
    }
}
ChannelKick.COMMAND = 'KICK';
