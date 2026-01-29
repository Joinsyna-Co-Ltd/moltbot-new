"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error441UserNotInChannel = void 0;
const Message_1 = require("../../Message");
class Error441UserNotInChannel extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channel: { type: 'channel' },
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
exports.Error441UserNotInChannel = Error441UserNotInChannel;
Error441UserNotInChannel.COMMAND = '441';
