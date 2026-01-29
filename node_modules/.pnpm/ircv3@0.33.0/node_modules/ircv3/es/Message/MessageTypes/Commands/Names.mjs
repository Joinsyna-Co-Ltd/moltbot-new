import { Message } from "../../Message.mjs";
export class Names extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channelList', optional: true }
        });
    }
}
Names.COMMAND = 'NAMES';
Names.SUPPORTS_CAPTURE = true;
