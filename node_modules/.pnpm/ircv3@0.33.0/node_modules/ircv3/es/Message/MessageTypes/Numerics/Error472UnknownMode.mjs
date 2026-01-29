import { Message } from "../../Message.mjs";
export class Error472UnknownMode extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            char: {},
            suffix: { trailing: true }
        });
    }
}
Error472UnknownMode.COMMAND = '472';
