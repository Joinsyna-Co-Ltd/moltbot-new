"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error471ChannelIsFull = void 0;
const Message_1 = require("../../Message");
class Error471ChannelIsFull extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error471ChannelIsFull = Error471ChannelIsFull;
Error471ChannelIsFull.COMMAND = '471';
