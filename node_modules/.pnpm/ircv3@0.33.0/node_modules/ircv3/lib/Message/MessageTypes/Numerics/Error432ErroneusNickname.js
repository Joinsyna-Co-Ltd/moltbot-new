"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error432ErroneusNickname = void 0;
const Message_1 = require("../../Message");
class Error432ErroneusNickname extends Message_1.Message {
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
exports.Error432ErroneusNickname = Error432ErroneusNickname;
Error432ErroneusNickname.COMMAND = '432';
