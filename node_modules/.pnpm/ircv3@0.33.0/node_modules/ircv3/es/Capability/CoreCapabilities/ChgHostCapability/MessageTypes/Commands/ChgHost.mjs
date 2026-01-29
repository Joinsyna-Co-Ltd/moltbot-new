import { Message } from "../../../../../Message/Message.mjs";
export class ChgHost extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            newUser: {},
            newHost: {}
        });
    }
}
ChgHost.COMMAND = 'CHGHOST';
