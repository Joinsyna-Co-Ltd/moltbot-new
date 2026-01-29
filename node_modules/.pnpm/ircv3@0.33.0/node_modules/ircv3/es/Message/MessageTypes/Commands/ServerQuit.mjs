import { Message } from "../../Message.mjs";
export class ServerQuit extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: {},
            reason: { trailing: true }
        });
    }
}
ServerQuit.COMMAND = 'SQUIT';
