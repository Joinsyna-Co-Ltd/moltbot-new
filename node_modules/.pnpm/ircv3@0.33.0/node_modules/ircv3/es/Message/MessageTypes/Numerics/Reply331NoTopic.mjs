import { Message } from "../../Message.mjs";
export class Reply331NoTopic extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Reply331NoTopic.COMMAND = '331';
