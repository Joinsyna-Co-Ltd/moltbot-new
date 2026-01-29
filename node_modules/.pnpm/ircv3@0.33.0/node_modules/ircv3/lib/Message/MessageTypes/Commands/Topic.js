"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const Message_1 = require("../../Message");
class Topic extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            newTopic: { optional: true, trailing: true }
        });
    }
}
exports.Topic = Topic;
Topic.COMMAND = 'TOPIC';
