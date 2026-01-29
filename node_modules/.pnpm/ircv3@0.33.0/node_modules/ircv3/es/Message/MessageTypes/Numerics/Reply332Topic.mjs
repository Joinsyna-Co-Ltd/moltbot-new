import { Message } from "../../Message.mjs";
export class Reply332Topic extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            topic: { trailing: true }
        });
    }
}
Reply332Topic.COMMAND = '332';
