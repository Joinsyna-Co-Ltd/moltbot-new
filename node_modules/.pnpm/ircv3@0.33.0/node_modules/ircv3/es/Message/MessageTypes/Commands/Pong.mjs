import { Message } from "../../Message.mjs";
export class Pong extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { noClient: true },
            text: { trailing: true }
        });
    }
}
Pong.COMMAND = 'PONG';
