import { Message } from "../../Message.mjs";
export class WallopsMessage extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
WallopsMessage.COMMAND = 'WALLOPS';
