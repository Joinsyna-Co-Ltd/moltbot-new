"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply375MotdStart = void 0;
const Message_1 = require("../../Message");
class Reply375MotdStart extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            line: { trailing: true }
        });
    }
}
exports.Reply375MotdStart = Reply375MotdStart;
Reply375MotdStart.COMMAND = '375';
