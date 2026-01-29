import { Message } from "../../Message.mjs";
export class Reply221UmodeIs extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            modes: {}
        });
    }
}
Reply221UmodeIs.COMMAND = '221';
