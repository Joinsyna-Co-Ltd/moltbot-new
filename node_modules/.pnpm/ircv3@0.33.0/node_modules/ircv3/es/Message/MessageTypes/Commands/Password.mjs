import { Message } from "../../Message.mjs";
export class Password extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            password: {}
        });
    }
}
Password.COMMAND = 'PASS';
