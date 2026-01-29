"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply322List = void 0;
const Message_1 = require("../../Message");
class Reply322List extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            memberCount: {},
            topic: { trailing: true }
        });
    }
}
exports.Reply322List = Reply322List;
Reply322List.COMMAND = '322';
