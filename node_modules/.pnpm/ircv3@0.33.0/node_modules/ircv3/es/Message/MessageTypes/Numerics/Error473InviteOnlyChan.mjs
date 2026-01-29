import { Message } from "../../Message.mjs";
export class Error473InviteOnlyChan extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error473InviteOnlyChan.COMMAND = '473';
