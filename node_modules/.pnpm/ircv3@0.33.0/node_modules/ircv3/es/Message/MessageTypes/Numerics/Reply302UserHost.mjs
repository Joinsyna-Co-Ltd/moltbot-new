import { Message } from "../../Message.mjs";
export class Reply302UserHost extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            hosts: { trailing: true }
        });
    }
}
Reply302UserHost.COMMAND = '302';
