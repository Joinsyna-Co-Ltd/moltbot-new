import { Message } from "../../Message.mjs";
export class ChannelList extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { optional: true },
            server: { optional: true }
        });
    }
}
ChannelList.COMMAND = 'LIST';
