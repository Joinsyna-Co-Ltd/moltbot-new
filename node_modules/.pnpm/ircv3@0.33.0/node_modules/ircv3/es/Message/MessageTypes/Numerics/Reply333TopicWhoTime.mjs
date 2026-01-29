import { Message } from "../../Message.mjs";
export class Reply333TopicWhoTime extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            who: {},
            ts: {}
        });
    }
}
Reply333TopicWhoTime.COMMAND = '333';
