"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error421UnknownCommand = void 0;
const Message_1 = require("../../Message");
class Error421UnknownCommand extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            originalCommand: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage.command === this.originalCommand;
    }
    endsResponseTo() {
        return true;
    }
}
exports.Error421UnknownCommand = Error421UnknownCommand;
Error421UnknownCommand.COMMAND = '421';
