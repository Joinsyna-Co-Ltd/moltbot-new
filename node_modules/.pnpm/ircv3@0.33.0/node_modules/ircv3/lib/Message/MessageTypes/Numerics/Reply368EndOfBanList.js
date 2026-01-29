"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply368EndOfBanList = void 0;
const Message_1 = require("../../Message");
class Reply368EndOfBanList extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Reply368EndOfBanList = Reply368EndOfBanList;
Reply368EndOfBanList.COMMAND = '368';
