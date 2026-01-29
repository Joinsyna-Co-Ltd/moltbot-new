"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply367BanList = void 0;
const Message_1 = require("../../Message");
class Reply367BanList extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            mask: {},
            creatorName: { optional: true },
            timestamp: { optional: true }
        });
    }
}
exports.Reply367BanList = Reply367BanList;
Reply367BanList.COMMAND = '367';
