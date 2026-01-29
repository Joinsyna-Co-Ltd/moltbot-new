"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const Message_1 = require("../../Message");
class ErrorMessage extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
exports.ErrorMessage = ErrorMessage;
ErrorMessage.COMMAND = 'ERROR';
