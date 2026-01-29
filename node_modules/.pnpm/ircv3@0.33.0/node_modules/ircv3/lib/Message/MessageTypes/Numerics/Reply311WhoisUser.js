"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply311WhoisUser = void 0;
const Message_1 = require("../../Message");
class Reply311WhoisUser extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            username: {},
            host: {},
            _unused: {},
            realname: { trailing: true }
        });
    }
}
exports.Reply311WhoisUser = Reply311WhoisUser;
Reply311WhoisUser.COMMAND = '311';
