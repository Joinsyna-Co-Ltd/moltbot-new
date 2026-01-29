import { Message } from "../../Message.mjs";
export class Error491NoOperHost extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error491NoOperHost.COMMAND = '491';
