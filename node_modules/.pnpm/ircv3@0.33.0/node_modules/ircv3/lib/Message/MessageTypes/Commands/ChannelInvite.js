"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelInvite = void 0;
const Message_1 = require("../../Message");
class ChannelInvite extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            channel: { type: 'channel' }
        });
    }
}
exports.ChannelInvite = ChannelInvite;
ChannelInvite.COMMAND = 'INVITE';
