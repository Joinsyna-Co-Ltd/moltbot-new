"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply391Time = void 0;
const Message_1 = require("../../Message");
class Reply391Time extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            server: { optional: true },
            timestamp: { trailing: true }
        });
    }
}
exports.Reply391Time = Reply391Time;
Reply391Time.COMMAND = '391';
