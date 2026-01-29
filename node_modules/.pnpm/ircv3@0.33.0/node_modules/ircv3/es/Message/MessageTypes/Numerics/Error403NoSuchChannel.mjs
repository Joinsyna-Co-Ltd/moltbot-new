import { Message } from "../../Message.mjs";
export class Error403NoSuchChannel extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
Error403NoSuchChannel.COMMAND = '403';
