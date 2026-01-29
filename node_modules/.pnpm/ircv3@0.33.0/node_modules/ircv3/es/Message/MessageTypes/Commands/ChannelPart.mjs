import { Message } from "../../Message.mjs";
export class ChannelPart extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            reason: { trailing: true, optional: true }
        });
    }
}
ChannelPart.COMMAND = 'PART';
