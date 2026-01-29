import { Message } from "../../Message.mjs";
export class Ping extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
Ping.COMMAND = 'PING';
