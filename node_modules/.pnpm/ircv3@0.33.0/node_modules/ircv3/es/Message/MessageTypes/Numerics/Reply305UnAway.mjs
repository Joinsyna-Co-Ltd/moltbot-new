import { Message } from "../../Message.mjs";
export class Reply305UnAway extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Reply305UnAway.COMMAND = '305';
