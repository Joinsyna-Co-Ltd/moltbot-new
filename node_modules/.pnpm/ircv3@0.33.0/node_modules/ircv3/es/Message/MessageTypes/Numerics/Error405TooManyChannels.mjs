import { Message } from "../../Message.mjs";
export class Error405TooManyChannels extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error405TooManyChannels.COMMAND = '405';
