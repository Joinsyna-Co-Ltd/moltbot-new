"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply301Away = void 0;
const Message_1 = require("../../Message");
class Reply301Away extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            text: { trailing: true }
        });
    }
}
exports.Reply301Away = Reply301Away;
Reply301Away.COMMAND = '301';
