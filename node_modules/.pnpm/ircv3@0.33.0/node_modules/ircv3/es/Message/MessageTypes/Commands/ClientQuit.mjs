import { Message } from "../../Message.mjs";
export class ClientQuit extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true, optional: true }
        });
    }
}
ClientQuit.COMMAND = 'QUIT';
