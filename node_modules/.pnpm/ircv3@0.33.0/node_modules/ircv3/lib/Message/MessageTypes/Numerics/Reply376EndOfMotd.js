"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply376EndOfMotd = void 0;
const Message_1 = require("../../Message");
class Reply376EndOfMotd extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Reply376EndOfMotd = Reply376EndOfMotd;
Reply376EndOfMotd.COMMAND = '376';
