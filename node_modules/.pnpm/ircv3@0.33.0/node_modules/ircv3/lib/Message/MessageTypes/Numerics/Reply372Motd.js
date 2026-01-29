"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply372Motd = void 0;
const Message_1 = require("../../Message");
class Reply372Motd extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            line: { trailing: true }
        });
    }
}
exports.Reply372Motd = Reply372Motd;
Reply372Motd.COMMAND = '372';
