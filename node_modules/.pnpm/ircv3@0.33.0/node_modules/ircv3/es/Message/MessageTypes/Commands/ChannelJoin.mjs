import { Message } from "../../Message.mjs";
export class ChannelJoin extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            key: { optional: true }
        });
    }
}
ChannelJoin.COMMAND = 'JOIN';
