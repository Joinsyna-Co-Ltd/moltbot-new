import { Message } from "../../Message.mjs";
export class Reply348ExceptList extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            mask: {},
            creatorName: { optional: true },
            timestamp: { optional: true }
        });
    }
}
Reply348ExceptList.COMMAND = '348';
