import { Message } from "../../Message.mjs";
export class Topic extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            newTopic: { optional: true, trailing: true }
        });
    }
}
Topic.COMMAND = 'TOPIC';
