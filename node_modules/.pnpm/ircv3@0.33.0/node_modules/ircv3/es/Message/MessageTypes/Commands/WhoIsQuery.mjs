import { Message } from "../../Message.mjs";
export class WhoIsQuery extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { optional: true },
            nickMask: {}
        });
    }
}
WhoIsQuery.COMMAND = 'WHOIS';
