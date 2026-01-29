"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply221UmodeIs = void 0;
const Message_1 = require("../../Message");
class Reply221UmodeIs extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            modes: {}
        });
    }
}
exports.Reply221UmodeIs = Reply221UmodeIs;
Reply221UmodeIs.COMMAND = '221';
