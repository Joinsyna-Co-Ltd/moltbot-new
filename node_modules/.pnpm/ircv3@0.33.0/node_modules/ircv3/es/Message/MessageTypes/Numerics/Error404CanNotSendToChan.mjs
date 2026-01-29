import { Message } from "../../Message.mjs";
export class Error404CanNotSendToChan extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error404CanNotSendToChan.COMMAND = '404';
