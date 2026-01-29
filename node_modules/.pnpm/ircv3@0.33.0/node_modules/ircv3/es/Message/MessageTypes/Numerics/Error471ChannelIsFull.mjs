import { Message } from "../../Message.mjs";
export class Error471ChannelIsFull extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error471ChannelIsFull.COMMAND = '471';
