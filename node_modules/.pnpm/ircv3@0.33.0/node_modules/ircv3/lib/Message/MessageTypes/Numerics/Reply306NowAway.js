"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply306NowAway = void 0;
const Message_1 = require("../../Message");
class Reply306NowAway extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Reply306NowAway = Reply306NowAway;
Reply306NowAway.COMMAND = '306';
