"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply353NamesReply = void 0;
const Message_1 = require("../../Message");
const Names_1 = require("../Commands/Names");
class Reply353NamesReply extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channelType: {},
            channel: { type: 'channel' },
            names: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof Names_1.Names;
    }
}
exports.Reply353NamesReply = Reply353NamesReply;
Reply353NamesReply.COMMAND = '353';
