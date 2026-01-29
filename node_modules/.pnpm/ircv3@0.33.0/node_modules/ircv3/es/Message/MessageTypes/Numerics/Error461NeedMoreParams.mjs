import { Message } from "../../Message.mjs";
export class Error461NeedMoreParams extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            originalCommand: {},
            suffix: { trailing: true }
        });
    }
}
Error461NeedMoreParams.COMMAND = '461';
