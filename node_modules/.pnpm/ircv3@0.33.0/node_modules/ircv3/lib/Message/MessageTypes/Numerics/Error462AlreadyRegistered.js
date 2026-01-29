"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error462AlreadyRegistered = void 0;
const Message_1 = require("../../Message");
class Error462AlreadyRegistered extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error462AlreadyRegistered = Error462AlreadyRegistered;
Error462AlreadyRegistered.COMMAND = '462';
