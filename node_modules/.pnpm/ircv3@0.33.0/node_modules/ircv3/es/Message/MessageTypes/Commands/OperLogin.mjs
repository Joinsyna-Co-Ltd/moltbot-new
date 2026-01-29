import { Message } from "../../Message.mjs";
export class OperLogin extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            name: {},
            password: {}
        });
    }
}
OperLogin.COMMAND = 'OPER';
