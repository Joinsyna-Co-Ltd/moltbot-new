import { Message } from "../../Message.mjs";
export class Time extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { optional: true }
        });
    }
}
Time.COMMAND = 'TIME';
