"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply349EndOfExceptList = void 0;
const Message_1 = require("../../Message");
class Reply349EndOfExceptList extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Reply349EndOfExceptList = Reply349EndOfExceptList;
Reply349EndOfExceptList.COMMAND = '349';
