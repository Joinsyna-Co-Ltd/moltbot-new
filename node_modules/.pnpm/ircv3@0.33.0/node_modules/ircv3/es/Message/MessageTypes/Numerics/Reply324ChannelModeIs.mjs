import { Message } from "../../Message.mjs";
export class Reply324ChannelModeIs extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            modes: { rest: true }
        });
    }
}
Reply324ChannelModeIs.COMMAND = '324';
