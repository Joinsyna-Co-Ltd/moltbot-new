import { Message } from "../../Message.mjs";
export class Error501UmodeUnknownFlag extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            modeChar: { optional: true, match: /^\w$/ },
            suffix: { trailing: true }
        });
    }
}
Error501UmodeUnknownFlag.COMMAND = '501';
