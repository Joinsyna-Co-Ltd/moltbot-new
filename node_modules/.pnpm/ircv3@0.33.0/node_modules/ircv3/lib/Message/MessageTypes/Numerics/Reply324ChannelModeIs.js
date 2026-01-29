"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply324ChannelModeIs = void 0;
const Message_1 = require("../../Message");
class Reply324ChannelModeIs extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            modes: { rest: true }
        });
    }
}
exports.Reply324ChannelModeIs = Reply324ChannelModeIs;
Reply324ChannelModeIs.COMMAND = '324';
