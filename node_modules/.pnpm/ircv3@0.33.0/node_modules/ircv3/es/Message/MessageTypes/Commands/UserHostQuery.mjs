import { Message } from "../../Message.mjs";
export class UserHostQuery extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nicks: { rest: true }
        });
    }
}
UserHostQuery.COMMAND = 'USERHOST';
