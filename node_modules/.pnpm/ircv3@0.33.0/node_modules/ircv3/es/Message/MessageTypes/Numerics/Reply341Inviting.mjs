import { Message } from "../../Message.mjs";
export class Reply341Inviting extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channel: { type: 'channel' }
        });
    }
}
Reply341Inviting.COMMAND = '341';
