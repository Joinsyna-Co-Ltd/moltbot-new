"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error404CanNotSendToChan = void 0;
const Message_1 = require("../../Message");
class Error404CanNotSendToChan extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error404CanNotSendToChan = Error404CanNotSendToChan;
Error404CanNotSendToChan.COMMAND = '404';
