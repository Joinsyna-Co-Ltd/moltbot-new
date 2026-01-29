"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply341Inviting = void 0;
const Message_1 = require("../../Message");
class Reply341Inviting extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            channel: { type: 'channel' }
        });
    }
}
exports.Reply341Inviting = Reply341Inviting;
Reply341Inviting.COMMAND = '341';
