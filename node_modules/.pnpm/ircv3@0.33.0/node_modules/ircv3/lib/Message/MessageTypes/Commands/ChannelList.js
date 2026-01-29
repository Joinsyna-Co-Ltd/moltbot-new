"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelList = void 0;
const Message_1 = require("../../Message");
class ChannelList extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { optional: true },
            server: { optional: true }
        });
    }
}
exports.ChannelList = ChannelList;
ChannelList.COMMAND = 'LIST';
