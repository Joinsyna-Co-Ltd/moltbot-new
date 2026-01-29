"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error442NotOnChannel = void 0;
const Message_1 = require("../../Message");
class Error442NotOnChannel extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
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
exports.Error442NotOnChannel = Error442NotOnChannel;
Error442NotOnChannel.COMMAND = '442';
