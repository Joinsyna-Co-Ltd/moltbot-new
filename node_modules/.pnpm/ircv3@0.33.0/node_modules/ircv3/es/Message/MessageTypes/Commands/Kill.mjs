import { Message } from "../../Message.mjs";
export class Kill extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            reason: { trailing: true, optional: true }
        });
    }
}
Kill.COMMAND = 'KILL';
