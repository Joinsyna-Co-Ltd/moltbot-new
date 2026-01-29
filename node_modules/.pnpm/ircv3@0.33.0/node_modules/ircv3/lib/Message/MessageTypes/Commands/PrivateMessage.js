"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateMessage = void 0;
const Message_1 = require("../../Message");
class PrivateMessage extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            text: { trailing: true }
        });
    }
}
exports.PrivateMessage = PrivateMessage;
PrivateMessage.COMMAND = 'PRIVMSG';
