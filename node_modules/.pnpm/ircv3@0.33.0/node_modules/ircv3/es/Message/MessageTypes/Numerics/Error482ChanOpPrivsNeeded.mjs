import { Message } from "../../Message.mjs";
export class Error482ChanOpPrivsNeeded extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
Error482ChanOpPrivsNeeded.COMMAND = '482';
