"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelKick = void 0;
const Message_1 = require("../../Message");
class ChannelKick extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            target: {},
            reason: { trailing: true, optional: true }
        });
    }
}
exports.ChannelKick = ChannelKick;
ChannelKick.COMMAND = 'KICK';
