"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error401NoSuchNick = void 0;
const Message_1 = require("../../Message");
class Error401NoSuchNick extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error401NoSuchNick = Error401NoSuchNick;
Error401NoSuchNick.COMMAND = '401';
