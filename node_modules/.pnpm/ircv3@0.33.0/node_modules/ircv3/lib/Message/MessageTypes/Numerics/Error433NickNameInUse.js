"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error433NickNameInUse = void 0;
const Message_1 = require("../../Message");
class Error433NickNameInUse extends Message_1.Message {
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
exports.Error433NickNameInUse = Error433NickNameInUse;
Error433NickNameInUse.COMMAND = '433';
