import { Message } from "../../Message.mjs";
export class Notice extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            text: { trailing: true }
        });
    }
}
Notice.COMMAND = 'NOTICE';
