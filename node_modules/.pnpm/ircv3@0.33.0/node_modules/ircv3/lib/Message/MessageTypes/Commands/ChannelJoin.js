"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelJoin = void 0;
const Message_1 = require("../../Message");
class ChannelJoin extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            key: { optional: true }
        });
    }
}
exports.ChannelJoin = ChannelJoin;
ChannelJoin.COMMAND = 'JOIN';
