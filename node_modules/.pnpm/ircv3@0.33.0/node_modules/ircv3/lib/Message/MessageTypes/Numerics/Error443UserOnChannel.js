"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error443UserOnChannel = void 0;
const Message_1 = require("../../Message");
class Error443UserOnChannel extends Message_1.Message {
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
exports.Error443UserOnChannel = Error443UserOnChannel;
Error443UserOnChannel.COMMAND = '443';
