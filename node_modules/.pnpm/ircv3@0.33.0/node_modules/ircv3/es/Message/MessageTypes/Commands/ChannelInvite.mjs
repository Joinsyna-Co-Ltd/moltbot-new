import { Message } from "../../Message.mjs";
export class ChannelInvite extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            channel: { type: 'channel' }
        });
    }
}
ChannelInvite.COMMAND = 'INVITE';
