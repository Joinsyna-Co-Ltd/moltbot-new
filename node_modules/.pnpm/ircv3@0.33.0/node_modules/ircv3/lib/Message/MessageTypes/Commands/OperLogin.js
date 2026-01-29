"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperLogin = void 0;
const Message_1 = require("../../Message");
class OperLogin extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            name: {},
            password: {}
        });
    }
}
exports.OperLogin = OperLogin;
OperLogin.COMMAND = 'OPER';
