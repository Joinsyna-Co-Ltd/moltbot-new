import { Message } from "../../Message.mjs";
export class Reply306NowAway extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Reply306NowAway.COMMAND = '306';
