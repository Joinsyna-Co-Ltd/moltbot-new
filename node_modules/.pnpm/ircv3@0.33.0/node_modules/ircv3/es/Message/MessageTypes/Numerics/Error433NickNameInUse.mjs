import { Message } from "../../Message.mjs";
export class Error433NickNameInUse extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage.command === 'NICK';
    }
    endsResponseTo() {
        return true;
    }
}
Error433NickNameInUse.COMMAND = '433';
