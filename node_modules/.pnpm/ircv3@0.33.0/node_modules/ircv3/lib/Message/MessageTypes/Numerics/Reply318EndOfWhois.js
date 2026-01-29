"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply318EndOfWhois = void 0;
const Message_1 = require("../../Message");
class Reply318EndOfWhois extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nickMask: {},
            suffix: { trailing: true }
        });
    }
}
exports.Reply318EndOfWhois = Reply318EndOfWhois;
Reply318EndOfWhois.COMMAND = '318';
