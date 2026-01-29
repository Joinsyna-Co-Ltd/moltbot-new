import { Message } from "../../Message.mjs";
export class Error475BadChannelKey extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
Error475BadChannelKey.COMMAND = '475';
