"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply319WhoisChannels = void 0;
const Message_1 = require("../../Message");
class Reply319WhoisChannels extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channels: { trailing: true }
        });
    }
}
exports.Reply319WhoisChannels = Reply319WhoisChannels;
Reply319WhoisChannels.COMMAND = '319';
