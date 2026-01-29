import { Message } from "../../Message.mjs";
export class IsOnQuery extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nicks: { rest: true }
        });
    }
}
IsOnQuery.COMMAND = 'ISON';
