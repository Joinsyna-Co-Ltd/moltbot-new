import { Message } from "../../Message.mjs";
export class Error402NoSuchServer extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            server: {},
            suffix: { trailing: true }
        });
    }
}
Error402NoSuchServer.COMMAND = '402';
