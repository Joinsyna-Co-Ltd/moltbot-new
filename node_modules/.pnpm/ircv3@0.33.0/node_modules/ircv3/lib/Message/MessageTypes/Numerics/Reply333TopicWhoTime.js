"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply333TopicWhoTime = void 0;
const Message_1 = require("../../Message");
class Reply333TopicWhoTime extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            who: {},
            ts: {}
        });
    }
}
exports.Reply333TopicWhoTime = Reply333TopicWhoTime;
Reply333TopicWhoTime.COMMAND = '333';
