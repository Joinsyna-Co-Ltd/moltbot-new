import { Message } from "../../Message.mjs";
export class UserRegistration extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            user: {},
            mode: {},
            unused: {},
            realName: { trailing: true }
        });
    }
}
UserRegistration.COMMAND = 'USER';
