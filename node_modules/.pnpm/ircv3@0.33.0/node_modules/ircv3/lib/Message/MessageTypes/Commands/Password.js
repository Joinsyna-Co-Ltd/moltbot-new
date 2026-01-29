"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const Message_1 = require("../../Message");
class Password extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            password: {}
        });
    }
}
exports.Password = Password;
Password.COMMAND = 'PASS';
