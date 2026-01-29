import { Message } from "../../Message.mjs";
export class ErrorMessage extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
ErrorMessage.COMMAND = 'ERROR';
