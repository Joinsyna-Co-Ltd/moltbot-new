"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply323ListEnd = void 0;
const Message_1 = require("../../Message");
class Reply323ListEnd extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Reply323ListEnd = Reply323ListEnd;
Reply323ListEnd.COMMAND = '323';
