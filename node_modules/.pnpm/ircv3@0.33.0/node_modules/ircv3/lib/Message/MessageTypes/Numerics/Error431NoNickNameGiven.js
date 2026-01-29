"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error431NoNickNameGiven = void 0;
const Message_1 = require("../../Message");
class Error431NoNickNameGiven extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
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
exports.Error431NoNickNameGiven = Error431NoNickNameGiven;
Error431NoNickNameGiven.COMMAND = '431';
