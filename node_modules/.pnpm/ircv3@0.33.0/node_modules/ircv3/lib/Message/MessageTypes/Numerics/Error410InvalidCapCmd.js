"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error410InvalidCapCmd = void 0;
const Message_1 = require("../../Message");
class Error410InvalidCapCmd extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            subCommand: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error410InvalidCapCmd = Error410InvalidCapCmd;
Error410InvalidCapCmd.COMMAND = '410';
