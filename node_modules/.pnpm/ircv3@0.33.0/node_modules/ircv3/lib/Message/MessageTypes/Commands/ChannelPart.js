"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelPart = void 0;
const Message_1 = require("../../Message");
class ChannelPart extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            reason: { trailing: true, optional: true }
        });
    }
}
exports.ChannelPart = ChannelPart;
ChannelPart.COMMAND = 'PART';
