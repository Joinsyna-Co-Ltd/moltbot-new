import { Message } from "../../Message.mjs";
export class Reply005Isupport extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            supports: { rest: true },
            suffix: { trailing: true }
        });
    }
}
Reply005Isupport.COMMAND = '005';
