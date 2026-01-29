import { Message } from "../../Message.mjs";
export class Reply003Created extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            createdText: { trailing: true }
        });
    }
}
Reply003Created.COMMAND = '003';
