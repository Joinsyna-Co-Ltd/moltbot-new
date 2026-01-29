import { Message } from "../../Message.mjs";
export class Error502UsersDontMatch extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error502UsersDontMatch.COMMAND = '502';
