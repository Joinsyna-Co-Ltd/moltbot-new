import { Message } from "../../Message.mjs";
export class Reply311WhoisUser extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            username: {},
            host: {},
            _unused: {},
            realname: { trailing: true }
        });
    }
}
Reply311WhoisUser.COMMAND = '311';
