"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply332Topic = void 0;
const Message_1 = require("../../Message");
class Reply332Topic extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            topic: { trailing: true }
        });
    }
}
exports.Reply332Topic = Reply332Topic;
Reply332Topic.COMMAND = '332';
