import { Message } from "../../Message.mjs";
export class Reply367BanList extends Message {
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
Reply367BanList.COMMAND = '367';
