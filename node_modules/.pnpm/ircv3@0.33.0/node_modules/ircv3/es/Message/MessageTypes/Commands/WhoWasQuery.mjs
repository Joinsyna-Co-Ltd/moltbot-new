import { Message } from "../../Message.mjs";
export class WhoWasQuery extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nick: {},
            count: { optional: true },
            server: { optional: true }
        });
    }
}
WhoWasQuery.COMMAND = 'WHOWAS';
