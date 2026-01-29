"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error436NickCollision = void 0;
const Message_1 = require("../../Message");
class Error436NickCollision extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            nick: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage.command === 'NICK';
    }
    endsResponseTo() {
        return true;
    }
}
exports.Error436NickCollision = Error436NickCollision;
Error436NickCollision.COMMAND = '436';
