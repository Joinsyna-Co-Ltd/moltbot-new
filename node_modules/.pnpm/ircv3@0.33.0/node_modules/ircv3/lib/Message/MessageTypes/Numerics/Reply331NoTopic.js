"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply331NoTopic = void 0;
const Message_1 = require("../../Message");
class Reply331NoTopic extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Reply331NoTopic = Reply331NoTopic;
Reply331NoTopic.COMMAND = '331';
