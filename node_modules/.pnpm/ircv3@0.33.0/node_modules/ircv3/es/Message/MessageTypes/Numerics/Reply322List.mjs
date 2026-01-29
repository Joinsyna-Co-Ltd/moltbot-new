import { Message } from "../../Message.mjs";
export class Reply322List extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            memberCount: {},
            topic: { trailing: true }
        });
    }
}
Reply322List.COMMAND = '322';
