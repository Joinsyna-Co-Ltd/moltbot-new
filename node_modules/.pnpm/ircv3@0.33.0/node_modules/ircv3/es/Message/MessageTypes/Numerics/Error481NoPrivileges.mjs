import { Message } from "../../Message.mjs";
export class Error481NoPrivileges extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
Error481NoPrivileges.COMMAND = '481';
