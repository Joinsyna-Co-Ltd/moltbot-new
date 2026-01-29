"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply348ExceptList = void 0;
const Message_1 = require("../../Message");
class Reply348ExceptList extends Message_1.Message {
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
exports.Reply348ExceptList = Reply348ExceptList;
Reply348ExceptList.COMMAND = '348';
