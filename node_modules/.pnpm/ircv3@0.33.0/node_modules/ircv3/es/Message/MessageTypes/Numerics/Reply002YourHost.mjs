import { Message } from "../../Message.mjs";
export class Reply002YourHost extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            yourHost: { trailing: true }
        });
    }
}
Reply002YourHost.COMMAND = '002';
