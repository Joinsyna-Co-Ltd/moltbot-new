import { Message } from "../../Message.mjs";
export class Error410InvalidCapCmd extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            subCommand: {},
            suffix: { trailing: true }
        });
    }
}
Error410InvalidCapCmd.COMMAND = '410';
