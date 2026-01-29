import { Message } from "../../Message.mjs";
export class Error479BadChanName extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
Error479BadChanName.COMMAND = '479';
