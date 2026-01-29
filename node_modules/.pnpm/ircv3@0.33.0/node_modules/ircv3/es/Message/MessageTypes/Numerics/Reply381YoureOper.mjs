import { Message } from "../../Message.mjs";
export class Reply381YoureOper extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Reply381YoureOper.COMMAND = '381';
